// E-commerce-Back-End/src/controllers/userController.js

const User = require('../models/User');
const logger = require('../config/logger'); // Importe o logger

// Registrar um novo usuário
exports.registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken(); // Gera o token após o registro
        res.status(201).send({ user: user.getPublicProfile(), token });
    } catch (error) {
        logger.error(`Erro ao registrar usuário: ${error.message}`, { stack: error.stack, payload: req.body });
        res.status(400).send({ message: "Erro ao registrar usuário.", error: error.message });
    }
};

// Login de usuário
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "Credenciais inválidas." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).send({ message: "Credenciais inválidas." });
        }

        const token = await user.generateAuthToken();
        res.status(200).send({ user: user.getPublicProfile(), token });
    } catch (error) {
        logger.error(`Erro no login do usuário: ${error.message}`, { stack: error.stack, payload: req.body });
        res.status(500).send({ message: "Erro interno no servidor.", error: error.message });
    }
};

// Obter perfil do usuário (requer autenticação)
exports.getUserProfile = async (req, res) => {
    res.send(req.user.getPublicProfile());
};

// Atualizar perfil do usuário (requer autenticação)
exports.updateUserProfile = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ message: 'Atualizações inválidas!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.status(200).send(req.user.getPublicProfile());
    } catch (error) {
        logger.error(`Erro ao atualizar perfil do usuário: ${error.message}`, { stack: error.stack, payload: req.body });
        res.status(400).send({ message: "Erro ao atualizar perfil.", error: error.message });
    }
};



