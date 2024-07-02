const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
require('./database');

require('dotenv').config()

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor da imobiliária!');
});

app.use(require('../routes/clientes'));
app.use(require('../routes/usuarios'));
app.use(require('../routes/imoveis'));
app.use(require('../routes/visitantes'));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
