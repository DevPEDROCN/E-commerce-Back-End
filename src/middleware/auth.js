// E-commerce-Back-End/src/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); // Pega o token do header
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.token = token; // Anexa o token à requisição
        req.user = user;   // Anexa o usuário à requisição
        next(); // Continua para a próxima função da rota
    } catch (error) {
        logger.warn(`Falha na autenticação: ${error.message}`);
        res.status(401).send({ message: 'Por favor, autentique-se.', error: error.message });
    }
};

module.exports = auth;