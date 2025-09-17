// E-commerce-Back-End/app.js

require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB!'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API de E-commerce funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});