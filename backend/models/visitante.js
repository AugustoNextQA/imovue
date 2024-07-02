const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    ip: String,
    device: String,
    url: String,
    createdAt: { type: Date, default: Date.now }
});

const dailyVisitsSchema = new mongoose.Schema({
    date: String,  // Format: 'YYYY-MM-DD'
    visits: [visitSchema]
});

const Visitante = mongoose.model('Visitante', dailyVisitsSchema);

module.exports = Visitante;