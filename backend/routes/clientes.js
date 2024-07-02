const express = require('express');
const rotaClientes = express.Router();
const Cliente = require('../models/cliente');
const { cnpjValido } = require('../helpers/helpers');

// Rota para listar todos os clientes
rotaClientes.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        console.error('Erro ao obter clientes:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para cadastrar um novo cliente
rotaClientes.post('/clientes', async (req, res) => {
    const { nome, cnpj } = req.body;
    try {
        const clienteExistente = await Cliente.findOne({ cnpj });
        if (clienteExistente) {
            return res.status(400).json({ mensagem: 'Cliente já cadastrado com este CNPJ' });
        }
        if (!cnpjValido(cnpj)) {
            return res.status(400).json({ mensagem: 'CNPJ inválido' });
        }

        const novoCliente = await Cliente.create({ nome, cnpj });
        res.json(novoCliente);
    } catch (err) {
        console.error('Erro ao cadastrar cliente:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para atualizar um cliente existente
rotaClientes.put('/clientes/:id', async (req, res) => {
    const { nome, cnpj } = req.body;
    const { id } = req.params;
    try {
        const clienteExistente = await Cliente.findOne({ cnpj });
        if (clienteExistente && clienteExistente._id.toString() !== id) {
            return res.status(400).json({ mensagem: 'Cliente já cadastrado com este CNPJ' });
        }
        if (!cnpjValido(cnpj)) {
            return res.status(400).json({ mensagem: 'CNPJ inválido' });
        }

        const clienteAtualizado = await Cliente.findByIdAndUpdate(id, { nome, cnpj }, { new: true });
        res.json(clienteAtualizado);
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para excluir um cliente existente
rotaClientes.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Cliente.findByIdAndDelete(id);
        res.json({ mensagem: 'Cliente excluído com sucesso!' });
    } catch (err) {
        console.error('Erro ao excluir cliente:', err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = rotaClientes;
