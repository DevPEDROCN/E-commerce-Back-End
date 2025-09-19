// E-commerce-Back-End/app.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes'); // Importe as rotas de pedido
const logger = require('./src/config/logger');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => logger.info('Conectado ao MongoDB!'))
.catch(err => {
    logger.error('Erro ao conectar ao MongoDB:', { error: err.message, stack: err.stack });
    process.exit(1);
});

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API de E-commerce funcionando!');
});

app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes); // Usar as rotas de pedido com o prefixo /api

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    // Para erros gerados por "throw new Error()" ou promessas rejeitadas
    logger.error(`Erro não tratado: ${err.message}`, { stack: err.stack, path: req.path, method: req.method, body: req.body });
    res.status(500).send({ message: 'Ocorreu um erro interno no servidor.' });
});

app.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
    console.log(`Servidor rodando na porta ${PORT}`);
});