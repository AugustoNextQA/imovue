const express = require('express');
const rotaVisitantes = express.Router();
const Visitante = require('../models/visitante.js');

// Rota para buscar todas as visitas
rotaVisitantes.get('/visits', async (req, res) => {
    try {
        const visits = await Visitante.find().sort({ date: -1 });
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar visitas' });
    }
});

// Rota para registrar uma nova visita
rotaVisitantes.post('/visits', async (req, res) => {
    try {
        const { ip, device, url } = req.body;
        const today = new Date().toISOString().split('T')[0];
        const visit = { ip, device, url, createdAt: new Date() };

        let dailyVisit = await Visitante.findOne({ date: today });

        if (dailyVisit) {
            dailyVisit.visits.push(visit);
        } else {
            dailyVisit = new Visitante({ date: today, visits: [visit] });
        }

        await dailyVisit.save();
        res.status(201).json(dailyVisit);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar visita' });
    }
});

// Rota para excluir todos os visitantes
rotaVisitantes.delete('/visits', async (req, res) => {
    try {
        await Visitante.deleteMany();
        res.status(200).json({ message: 'Todos os visitantes foram excluídos com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir todos os visitantes' });
    }
});

// Rota para excluir visitantes por data
rotaVisitantes.delete('/visits/:data', async (req, res) => {
    const dataParam = req.params.data;
    try {
        await Visitante.deleteMany({ date: dataParam });

        res.status(200).json({ message: `Visitantes da data ${dataParam} excluídos com sucesso` });
    } catch (error) {
        res.status(500).json({ error: `Erro ao excluir visitantes da data ${dataParam}` });
    }
});

module.exports = rotaVisitantes;