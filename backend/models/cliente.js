const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cnpj: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cliente', clienteSchema);
