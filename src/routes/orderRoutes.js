// E-commerce-Back-End/src/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth'); // Middleware de autenticação

// Rota para criar um novo pedido (requer autenticação)
router.post('/orders', auth, orderController.createOrder);

// Rota para obter todos os pedidos do usuário autenticado
router.get('/orders/me', auth, orderController.getUserOrders);

// Rota para obter um pedido específico por ID (do usuário autenticado)
router.get('/orders/:id', auth, orderController.getOrderById);

// Rota para atualizar o status de um pedido (ADMIN SOMENTE NO FUTURO)
router.patch('/orders/:id/status', auth, orderController.updateOrderStatus);

// Rota para obter TODOS os pedidos (ADMIN SOMENTE NO FUTURO)
router.get('/orders', auth, orderController.getAllOrders); // Por enquanto, qualquer autenticado pode ver, mas isso deve ser restrito.

module.exports = router;