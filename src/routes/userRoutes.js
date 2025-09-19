// E-commerce-Back-End/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // Middleware de autenticação (criaremos em breve)

// Rota para registrar um novo usuário
router.post('/users/register', userController.registerUser);

// Rota para login de usuário
router.post('/users/login', userController.loginUser);

// Rota para obter perfil do usuário autenticado (requer token JWT)
router.get('/users/me', auth, userController.getUserProfile);

// Rota para atualizar perfil do usuário autenticado
router.patch('/users/me', auth, userController.updateUserProfile);

module.exports = router;