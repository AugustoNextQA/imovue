const express = require('express');
const rotaUsuarios = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const gerarToken = require('../config/auth');
const { cnpjValido, emailValido } = require('../helpers/helpers');
const verificarToken = require('../middleware/verificarToken');

rotaUsuarios.get('/usuarios', verificarToken, async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        console.error('Erro ao obter usuários:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para cadastrar um novo usuário
rotaUsuarios.post('/usuarios', async (req, res) => {
    const { nome, sobrenome, username, email, cnpj, senha, confirmarSenha } = req.body;
    try {
        if (!nome || !sobrenome || !username || !email || !cnpj || !senha || !confirmarSenha) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }
        if (!/^[a-zA-Z\s]+$/.test(nome)) {
            return res.status(400).json({ mensagem: 'O nome deve conter apenas letras' });
        }
        if (!/^[a-zA-Z\s]+$/.test(sobrenome)) {
            return res.status(400).json({ mensagem: 'O sobrenome deve conter apenas letras' });
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return res.status(400).json({ mensagem: 'O nome de usuário deve conter apenas letras, números e underscores' });
        }
        const usuarioExistenteUsername = await Usuario.findOne({ username });
        if (usuarioExistenteUsername) {
            return res.status(400).json({ mensagem: 'Nome de usuário já cadastrado' });
        }
        const usuarioExistenteEmail = await Usuario.findOne({ email });
        if (usuarioExistenteEmail) {
            return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
        }
        if (!emailValido(email)) {
            return res.status(400).json({ mensagem: 'E-mail inválido' });
        }
        if (!cnpjValido(cnpj)) {
            return res.status(400).json({ mensagem: 'CNPJ inválido' });
        }
        const usuarioExistenteCNPJ = await Usuario.findOne({ cnpj });
        if (usuarioExistenteCNPJ) {
            return res.status(400).json({ mensagem: 'CNPJ já cadastrado' });
        }
        if (senha !== confirmarSenha) {
            return res.status(400).json({ mensagem: 'Senhas não coincidem' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = await Usuario.create({ nome, sobrenome, username, email, cnpj, senha: senhaCriptografada, role: 'user' });
        res.json(novoUsuario);
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para cadastrar um novo administrador (acessível apenas via Postman)
rotaUsuarios.post('/usuarios/admin', async (req, res) => {
    const { nome, sobrenome, username, email, cnpj, senha, confirmarSenha } = req.body;
    try {
        if (!nome || !sobrenome || !username || !email || !cnpj || !senha || !confirmarSenha) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }
        if (!/^[a-zA-Z\s]+$/.test(nome)) {
            return res.status(400).json({ mensagem: 'O nome deve conter apenas letras' });
        }
        if (!/^[a-zA-Z\s]+$/.test(sobrenome)) {
            return res.status(400).json({ mensagem: 'O sobrenome deve conter apenas letras' });
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return res.status(400).json({ mensagem: 'O nome de usuário deve conter apenas letras, números e underscores' });
        }
        const usuarioExistenteUsername = await Usuario.findOne({ username });
        if (usuarioExistenteUsername) {
            return res.status(400).json({ mensagem: 'Nome de usuário já cadastrado' });
        }
        const usuarioExistenteEmail = await Usuario.findOne({ email });
        if (usuarioExistenteEmail) {
            return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
        }
        if (!emailValido(email)) {
            return res.status(400).json({ mensagem: 'E-mail inválido' });
        }
        if (!cnpjValido(cnpj)) {
            return res.status(400).json({ mensagem: 'CNPJ inválido' });
        }
        const usuarioExistenteCNPJ = await Usuario.findOne({ cnpj });
        if (usuarioExistenteCNPJ) {
            return res.status(400).json({ mensagem: 'CNPJ já cadastrado' });
        }
        if (senha !== confirmarSenha) {
            return res.status(400).json({ mensagem: 'Senhas não coincidem' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = await Usuario.create({ nome, sobrenome, username, email, cnpj, senha: senhaCriptografada, role: 'admin' });
        res.json(novoUsuario);
    } catch (err) {
        console.error('Erro ao cadastrar administrador:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para fazer login e gerar token JWT
rotaUsuarios.post('/login', async (req, res) => {
    const { username, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ username });
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado' });
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha inválida' });
        }

        if (usuario.role !== 'admin') {
            return res.status(403).json({ mensagem: 'Acesso negado. Apenas administradores podem fazer login.' });
        }

        const token = gerarToken(usuario);
        res.json({ token, role: usuario.role, nome: usuario.nome });
    } catch (err) {
        console.error('Erro ao fazer login:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para obter e atualizar dados do usuario
rotaUsuarios.get('/usuarios/me', verificarToken, async (req, res) => {
    try {
        console.log('Verificando usuário com ID:', req.userId);
        const usuario = await Usuario.findById(req.userId);
        if (!usuario) {
            console.log('Usuário não encontrado');
            return res.status(404).send('Usuário não encontrado');
        }
        res.json(usuario);
    } catch (err) {
        console.error('Erro ao obter dados do usuário:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

rotaUsuarios.put('/usuarios/me', verificarToken, async (req, res) => {
    console.log('Dados recebidos para atualização:', req.body);
    const { nome, sobrenome, username, email, cnpj } = req.body;

    try {
        const usuario = await Usuario.findById(req.userId);

        if (!usuario) {
            console.log('Usuário não encontrado');
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const camposParaAtualizar = {};

        if (nome && nome !== usuario.nome) {
            camposParaAtualizar.nome = nome;
        }

        if (sobrenome && sobrenome !== usuario.sobrenome) {
            camposParaAtualizar.sobrenome = sobrenome;
        }

        if (username && username !== usuario.username) {
            const usuarioExistenteUsername = await Usuario.findOne({ username });
            if (usuarioExistenteUsername && usuarioExistenteUsername._id.toString() !== req.userId) {
                return res.status(400).json({ mensagem: 'Nome de usuário já cadastrado' });
            }
            camposParaAtualizar.username = username;
        }

        if (email && email !== usuario.email) {
            const usuarioExistenteEmail = await Usuario.findOne({ email });
            if (usuarioExistenteEmail && usuarioExistenteEmail._id.toString() !== req.userId) {
                return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
            }
            camposParaAtualizar.email = email;
        }

        if (cnpj && cnpj !== usuario.cnpj) {
            if (!cnpjValido(cnpj)) {
                return res.status(400).json({ mensagem: 'CNPJ inválido' });
            }
            const usuarioExistenteCnpj = await Usuario.findOne({ cnpj });
            if (usuarioExistenteCnpj && usuarioExistenteCnpj._id.toString() !== req.userId) {
                return res.status(400).json({ mensagem: 'CNPJ já cadastrado' });
            }
            camposParaAtualizar.cnpj = cnpj;
        }

        const usuarioAtualizado = await Usuario.findByIdAndUpdate(req.userId, camposParaAtualizar, { new: true });

        console.log('Usuário atualizado:', usuarioAtualizado);
        res.json(usuarioAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err.message);
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
});

module.exports = rotaUsuarios;
