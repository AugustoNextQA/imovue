const express = require('express');
const { Types } = require('mongoose');
const rotaImoveis = express.Router();
const Imovel = require('../models/imovel');
const { cnpjValido } = require('../helpers/helpers');
const upload = require('../config/multer');
const { connectToFtp, uploadFiles, ensureDir, deleteFiles, renameFiles, getFileStream, deleteDir } = require('../config/ftp');
const verificarToken = require('../middleware/verificarToken');
const verificarAdmin = require('../middleware/verificarAdmin');
require('dotenv').config();

async function generateImovelId(categoria) {
    const prefixos = {
        'Apartamento': 'AP',
        'Casa': 'CS',
        'Lote': 'LT',
        'Kitnet': 'KN'
    };
    const prefixo = prefixos[categoria] || 'XX';
    const imoveis = await Imovel.find({ categoria }).sort({ id_imovel: 1 });
    const numeroSequencial = imoveis.length + 1;
    const numeroFormatado = String(numeroSequencial).padStart(2, '0');
    return `${prefixo}${numeroFormatado}-AGAS`;
}

// Rota para listar todos os imóveis
rotaImoveis.get('/imoveis', async (req, res) => {
    const { comercio, page = 1, limit = 20, order, minValue, maxValue, minArea, maxArea, categorias, quartos, vagas, banheiros, cidade, bairro, query, allProperties, maisAcessados, categoria, sortField, sortOrder } = req.query;
    const skip = (page - 1) * limit;

    try {
        if (maisAcessados) {
            const imoveisMaisAcessados = await Imovel.find({ visivel: true }).sort({ acessos: -1 }).limit(6);
            return res.json(imoveisMaisAcessados);
        }

        let mainQuery = {};
        let searchQuery = {};

        if (!allProperties) {
            mainQuery.visivel = true;
        }

        // Filtros de valor
        if (minValue) mainQuery.valor = { ...mainQuery.valor, $gte: parseFloat(minValue) };
        if (maxValue) mainQuery.valor = { ...mainQuery.valor, $lte: parseFloat(maxValue) };
        if (minArea) mainQuery.areaTotal = { ...mainQuery.areaTotal, $gte: parseFloat(minArea) };
        if (maxArea) mainQuery.areaTotal = { ...mainQuery.areaTotal, $lte: parseFloat(maxArea) };
        if (categorias) mainQuery.categoria = { $in: categorias.split(',') };
        if (quartos && quartos !== '0') mainQuery.quartos = quartos.includes('+') ? { $gte: parseInt(quartos) } : parseInt(quartos);
        if (vagas && vagas !== 'Indiferente') mainQuery.garagem = vagas.includes('+') ? { $gte: parseInt(vagas) } : parseInt(vagas);
        if (banheiros && banheiros !== '0') mainQuery.banheiros = banheiros.includes('+') ? { $gte: parseInt(banheiros) } : parseInt(banheiros);
        if (comercio) mainQuery.comercio = comercio;
        if (cidade) mainQuery.cidade = cidade;
        if (bairro) mainQuery.bairro = bairro;
        if (categoria) mainQuery.categoria = categoria;

        if (query) {
            const queries = query.split(',');
            searchQuery = {
                $or: [
                    { id_imovel: { $regex: new RegExp(queries.join('|'), 'i') } },
                    { comercio: { $regex: new RegExp(queries.join('|'), 'i') } },
                    { categoria: { $regex: new RegExp(queries.join('|'), 'i') } },
                    { rua: { $regex: new RegExp(queries.join('|'), 'i') } },
                    { bairro: { $regex: new RegExp(queries.join('|'), 'i') } },
                    { cidade: { $regex: new RegExp(queries.join('|'), 'i') } },
                    { estado: { $regex: new RegExp(queries.join('|'), 'i') } }
                ]
            };
        }

        let sort = {};
        if (order) {
            if (order === 'menor-valor') {
                sort.valor = 1;
            } else if (order === 'maior-valor') {
                sort.valor = -1;
            }
        }

        if (sortField) {
            sort[sortField] = sortOrder === 'desc' ? -1 : 1;
        }

        const totalImoveis = await Imovel.countDocuments({ ...mainQuery, ...searchQuery });
        const imoveis = await Imovel.find({ ...mainQuery, ...searchQuery }).skip(skip).limit(parseInt(limit)).sort(sort);

        res.json({ totalImoveis, imoveis });
    } catch (err) {
        console.error('Erro ao obter imóveis:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para cadastrar um novo imóvel
rotaImoveis.post('/imoveis', verificarToken, verificarAdmin, async (req, res) => {
    const { comercio, categoria, cep, rua, numero, bairro, cidade, estado, idGeoLocation, areaTotal, areaConstruida, quartos, banheiros, garagem, valor, iptu, condominio, id_cliente, cnpj_cliente, descricaoImovel, detalhesImovel, Parcelamento, Financiamento, Negociacao } = req.body;

    try {
        if (!cnpjValido(cnpj_cliente)) {
            return res.status(400).json({ mensagem: 'CNPJ do cliente inválido' });
        }
        if (!Types.ObjectId.isValid(id_cliente)) {
            return res.status(400).json({ mensagem: 'ID do cliente inválido' });
        }

        const id_imovel = await generateImovelId(categoria);
        const detalhesImovelArray = Array.isArray(detalhesImovel) ? detalhesImovel : detalhesImovel.split(',');

        const novoImovel = await Imovel.create({
            id_imovel,
            comercio: Array.isArray(comercio) ? comercio : [comercio],
            categoria, cep, rua, numero, bairro, cidade, estado,
            idGeoLocation, areaTotal, areaConstruida, quartos, banheiros, garagem,
            valor, iptu, condominio, id_cliente: Types.ObjectId.createFromHexString(id_cliente),
            cnpj_cliente, descricaoImovel, detalhesImovel: detalhesImovelArray,
            Parcelamento, Financiamento, Negociacao
        });

        res.json(novoImovel);
    } catch (err) {
        console.error('Erro ao cadastrar imóvel:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para atualizar um imóvel existente
rotaImoveis.put('/imoveis/:id_imovel', verificarToken, verificarAdmin, async (req, res) => {
    const { comercio, categoria, cep, rua, numero, bairro, cidade, estado, idGeoLocation, areaTotal, areaConstruida, quartos, banheiros, garagem, valor, iptu, condominio, id_cliente, cnpj_cliente, descricaoImovel, detalhesImovel, Parcelamento, Financiamento, Negociacao } = req.body;
    const { id_imovel } = req.params;

    try {
        if (!cnpjValido(cnpj_cliente)) {
            return res.status(400).json({ mensagem: 'CNPJ do cliente inválido' });
        }

        const imovelExistente = await Imovel.findOne({ id_imovel });
        if (!imovelExistente) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado' });
        }

        let novoIdImovel = id_imovel;

        if (imovelExistente.categoria !== categoria) {
            novoIdImovel = await generateImovelId(categoria);
        }

        const detalhesImovelArray = Array.isArray(detalhesImovel) ? detalhesImovel : detalhesImovel.split(',');

        const imovelAtualizado = await Imovel.findOneAndUpdate(
            { id_imovel },
            {
                id_imovel: novoIdImovel,
                comercio: Array.isArray(comercio) ? comercio : [comercio],
                categoria, cep, rua, numero, bairro, cidade, estado, idGeoLocation,
                areaTotal, areaConstruida, quartos, banheiros, garagem, valor, iptu, condominio,
                id_cliente, cnpj_cliente, descricaoImovel, detalhesImovel: detalhesImovelArray,
                Parcelamento, Financiamento, Negociacao
            },
            { new: true }
        );

        if (!imovelAtualizado) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado' });
        }

        res.json(imovelAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar imóvel:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para excluir um imóvel existente
rotaImoveis.delete('/imoveis/:id_imovel', verificarToken, verificarAdmin, async (req, res) => {
    const { id_imovel } = req.params;
    try {
        const imovelExcluido = await Imovel.findOneAndDelete({ id_imovel });

        if (!imovelExcluido) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado' });
        }

        const directory = `imagens/${id_imovel}`;
        await deleteDir(directory);

        res.json({ mensagem: 'Imóvel excluído com sucesso!' });
    } catch (err) {
        console.error('Erro ao excluir imóvel:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para obter os detalhes de um imóvel específico
rotaImoveis.get('/imoveis/:id_imovel', async (req, res) => {
    const { id_imovel } = req.params;
    try {
        const imovel = await Imovel.findOne({ id_imovel });
        if (!imovel) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado' });
        }

        if (req.headers['x-access-type'] === 'frontend') {
            imovel.acessos = (imovel.acessos || 0) + 1;
            await imovel.save();
        }

        res.json(imovel);
    } catch (err) {
        console.error('Erro ao obter detalhes do imóvel:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para enviar as imagens de um imóvel
rotaImoveis.post('/imoveis/imagem/:id_imovel', verificarToken, verificarAdmin, upload.array('imagem'), async (req, res) => {
    try {
        const { id_imovel } = req.params;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        let imovel = await Imovel.findOne({ id_imovel });
        if (!imovel) {
            imovel = new Imovel({ id_imovel, imagens: [] });
        }

        const directory = `imagens/${id_imovel}`;
        await ensureDir(directory);

        const existingImageCount = imovel.imagens.length;
        const imageInfos = [];
        const fileBuffers = [];
        const remotePaths = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filename = `${existingImageCount + i}.jpeg`;
            const remotePath = `${directory}/${filename}`;
            fileBuffers.push(file.buffer);
            remotePaths.push(remotePath);
            imageInfos.push({
                filename: filename,
                url: `https://agasimoveis.com.br/${remotePath}`,
                ordem: existingImageCount + i
            });
        }

        await uploadFiles(fileBuffers, remotePaths);

        imovel.imagens.push(...imageInfos);
        await imovel.save();

        res.status(200).send('Imagens enviadas com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar imagens:', error);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para atualizar as imagens de um imóvel
rotaImoveis.put('/imoveis/imagem/:id_imovel', verificarToken, verificarAdmin, upload.array('imagem'), async (req, res) => {
    try {
        const { id_imovel } = req.params;
        const files = req.files;
        const todasImagens = JSON.parse(req.body.todasImagens);

        if (!todasImagens && (!files || files.length === 0)) {
            return res.status(400).send('Nenhuma imagem enviada.');
        }

        let imovel = await Imovel.findOne({ id_imovel });
        if (!imovel) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado' });
        }

        const directory = `imagens/${id_imovel}`;
        await ensureDir(directory);

        const imagensExistentes = todasImagens.filter(img => !img.src.startsWith('data:'));
        const novasImagens = todasImagens.filter(img => img.src.startsWith('data:'));
        const deletePaths = imovel.imagens
            .filter(img => !imagensExistentes.some(e => e.filename === img.filename))
            .map(img => `imagens/${id_imovel}/${img.filename}`);

        await deleteFiles(deletePaths);

        imagensExistentes.forEach(imgExistente => {
            const img = imovel.imagens.find(img => img.filename === imgExistente.filename);
            if (img) {
                img.ordem = imgExistente.ordem;
            }
        });

        const imageInfos = [];
        const fileBuffers = [];
        const remotePaths = [];
        const existingImageCount = imagensExistentes.length;

        for (let i = 0; i < novasImagens.length; i++) {
            const img = novasImagens[i];
            const filename = `${existingImageCount + i}.jpeg`;
            const remotePath = `imagens/${id_imovel}/${filename}`;
            fileBuffers.push(Buffer.from(img.src.split(',')[1], 'base64'));
            remotePaths.push(remotePath);
            imageInfos.push({
                filename: filename,
                url: `https://agasimoveis.com.br/${remotePath}`,
                ordem: img.ordem
            });
        }

        await uploadFiles(fileBuffers, remotePaths);

        imovel.imagens = [...imagensExistentes, ...imageInfos].sort((a, b) => a.ordem - b.ordem);

        await imovel.save();

        res.status(200).send('Imagens atualizadas com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar imagens:', error);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para buscar as imagens de um imóvel
rotaImoveis.get('/imoveis/imagem/:id_imovel', async (req, res) => {
    try {
        const { id_imovel } = req.params;
        const imovel = await Imovel.findOne({ id_imovel });

        if (!imovel || !imovel.imagens || imovel.imagens.length === 0) {
            return res.status(404).json({ mensagem: 'Imagens não encontradas' });
        }

        res.json(imovel.imagens);
    } catch (error) {
        console.error('Erro ao buscar imagens:', error);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para obter uma imagem específica de um imóvel
rotaImoveis.get('/imoveis/imagem/:id_imovel/:filename', async (req, res) => {
    try {
        const { id_imovel, filename } = req.params;
        const imovel = await Imovel.findOne({ id_imovel });

        if (!imovel || !imovel.imagens || imovel.imagens.length === 0) {
            return res.status(404).json({ mensagem: 'Imagens não encontradas' });
        }

        const imagem = imovel.imagens.find(img => img.filename === filename);

        if (!imagem) {
            return res.status(404).json({ mensagem: 'Imagem não encontrada' });
        }

        const fileStream = await getFileStream(`imagens/${id_imovel}/${filename}`);
        if (!fileStream) {
            return res.status(404).json({ mensagem: 'Imagem não encontrada no servidor' });
        }

        res.set('Content-Type', 'image/jpeg');
        fileStream.pipe(res);
    } catch (error) {
        console.error('Erro ao obter imagem:', error);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para excluir uma imagem específica de um imóvel e renomear as imagens restantes
rotaImoveis.delete('/imoveis/imagem/:id_imovel/:filename', verificarToken, verificarAdmin, async (req, res) => {
    try {
        const { id_imovel, filename } = req.params;
        const imovel = await Imovel.findOne({ id_imovel });

        if (!imovel || !imovel.imagens || imovel.imagens.length === 0) {
            return res.status(404).json({ mensagem: 'Imagens não encontradas' });
        }

        const imagemIndex = imovel.imagens.findIndex(img => img.filename === filename);

        if (imagemIndex === -1) {
            return res.status(404).json({ mensagem: 'Imagem não encontrada' });
        }

        const remotePath = `imagens/${id_imovel}/${filename}`;
        await deleteFile(remotePath);

        imovel.imagens.splice(imagemIndex, 1);

        for (let i = imagemIndex; i < imovel.imagens.length; i++) {
            const oldFilename = imovel.imagens[i].filename;
            const newFilename = `${i}.jpeg`;
            const newUrl = imovel.imagens[i].url.replace(oldFilename, newFilename);
            await renameFile(`imagens/${id_imovel}/${oldFilename}`, `imagens/${id_imovel}/${newFilename}`);
            imovel.imagens[i].filename = newFilename;
            imovel.imagens[i].url = newUrl;
            imovel.imagens[i].ordem = i;
        }

        await imovel.save();

        res.status(200).json({ mensagem: 'Imagem excluída com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir imagem:', error);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para atualizar a visibilidade de um imóvel
rotaImoveis.put('/imoveis/visibilidade/:id_imovel', verificarToken, verificarAdmin, async (req, res) => {
    const { visivel } = req.body;
    const { id_imovel } = req.params;

    try {
        const imovelAtualizado = await Imovel.findOneAndUpdate(
            { id_imovel },
            { visivel },
            { new: true }
        );

        if (!imovelAtualizado) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado' });
        }

        res.json(imovelAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar visibilidade do imóvel:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para atualizar o destaque de um imóvel
rotaImoveis.put('/imoveis/destaque/:id_imovel', verificarToken, verificarAdmin, async (req, res) => {
    const { destaque } = req.body;
    const { id_imovel } = req.params;

    try {
        const imovelAtualizado = await Imovel.findOneAndUpdate(
            { id_imovel },
            { destaque },
            { new: true }
        );

        if (!imovelAtualizado) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado' });
        }

        res.json(imovelAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar destaque do imóvel:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para listar todas as cidades disponíveis nos imóveis
rotaImoveis.get('/cidades', async (req, res) => {
    try {
        const cidades = await Imovel.find().distinct('cidade');
        res.json({ cidades });
    } catch (err) {
        console.error('Erro ao buscar cidades:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para listar todos os bairros de uma cidade específica
rotaImoveis.get('/bairros', async (req, res) => {
    const { cidade } = req.query;
    try {
        const bairros = await Imovel.find({ cidade }).distinct('bairro');
        res.json({ bairros });
    } catch (err) {
        console.error('Erro ao buscar bairros:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = rotaImoveis;