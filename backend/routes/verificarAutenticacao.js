const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { USER_SECRET } = process.env;

// Rota para verificar a autenticação do usuário
router.post('/verificar-autenticacao', (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, USER_SECRET);
        res.json(decoded);
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        res.status(401).send('Não autorizado');
    }
});

// Rota para fazer logout
router.post('/logout', (req, res) => {
    res.send('Logout realizado com sucesso');
});

module.exports = router;
