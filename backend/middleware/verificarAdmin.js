const Usuario = require('../models/usuario');

async function verificarAdmin(req, res, next) {
    try {
        const usuario = await Usuario.findById(req.userId);
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado' });
        }

        if (usuario.role !== 'admin') {
            return res.status(403).json({ mensagem: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
        }

        next();
    } catch (err) {
        console.error('Erro ao verificar administrador:', err.message);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = verificarAdmin;
