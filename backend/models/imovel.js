const mongoose = require('mongoose');

const imagemSchema = new mongoose.Schema({
    filename: String,
    url: String,
    ordem: Number
});

const imovelSchema = new mongoose.Schema({
    id_imovel: {
        type: String,
        required: true
    },
    comercio: {
        type: [String],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    cep: {
        type: Number,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    idGeoLocation: {
        type: String,
        required: true
    },
    areaTotal: {
        type: Number,
        required: true
    },
    areaConstruida: {
        type: Number,
        required: true
    },
    quartos: {
        type: Number,
        required: true
    },
    banheiros: {
        type: Number,
        required: true
    },
    garagem: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    iptu: {
        type: Number,
        required: true
    },
    condominio: {
        type: Number,
        required: true
    },
    id_cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    cnpj_cliente: {
        type: Number,
        required: true
    },
    descricaoImovel: {
        type: String,
        required: true
    },
    detalhesImovel: {
        type: Array,
        required: true
    },
    Parcelamento: {
        type: Boolean,
        required: true
    },
    Financiamento: {
        type: Boolean,
        required: true
    },
    Negociacao: {
        type: Boolean,
        required: true
    },
    imagens: [imagemSchema],
    visivel: {
        type: Boolean,
        default: false
    },
    destaque: {
        type: Boolean,
        default: false
    },
    acessos: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Imovel', imovelSchema);