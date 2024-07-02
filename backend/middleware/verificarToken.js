const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

module.exports = function verificarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        console.log('Nenhum token fornecido');
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.USER_SECRET, async function (err, decoded) {
        if (err) {
            console.log('Falha ao autenticar o token:', err.message);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        const usuario = await Usuario.findById(decoded.id);
        if (!usuario) {
            console.log('Nenhum usuário encontrado para o token fornecido');
            return res.status(404).send('No user found.');
        }
        req.userId = decoded.id;
        req.userRole = usuario.role;
        next();
    });
};
