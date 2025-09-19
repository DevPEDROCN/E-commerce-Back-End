// E-commerce-Back-End/src/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para criar um novo produto
router.post('/products', productController.createProduct);

// Rota para obter todos os produtos
router.get('/products', productController.getProducts);

// Rota para obter um produto específico pelo ID
router.get('/products/:id', productController.getProductById);

// Rota para atualizar um produto pelo ID
router.patch('/products/:id', productController.updateProduct);

// Rota para deletar um produto pelo ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;