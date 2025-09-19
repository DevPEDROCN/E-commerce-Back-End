// E-commerce-Back-End/src/controllers/productController.js
const Product = require('../models/product');
const logger = require('../config/logger');

// Criar um novo produto
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        logger.error(`Erro ao criar produto: ${error.message}`, { stack: error.stack, payload: req.body });
        res.status(400).send({ message: "Erro ao criar produto.", error: error.message });
    }
};

// Obter todos os produtos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        logger.error(`Erro ao buscar produtos: ${error.message}`, { stack: error.stack });
        res.status(500).send({ message: "Erro ao buscar produtos.", error: error.message });
    }
};

// Obter um produto pelo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado." });
        }
        res.status(200).send(product);
    } catch (error) {
        logger.error(`Erro ao buscar produto: ${error.message}`, { stack: error.stack, params: req.params });
        res.status(500).send({ message: "Erro ao buscar produto.", error: error.message });
    }
};

// Atualizar um produto
exports.updateProduct = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price', 'category', 'stock', 'imageUrl'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        logger.warn('Tentativa de atualização inválida', { updates: req.body });
        return res.status(400).send({ message: 'Atualizações inválidas!' });
    }

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado." });
        }

        updates.forEach(update => product[update] = req.body[update]);
        await product.save();
        res.status(200).send(product);
    } catch (error) {
        logger.error(`Erro ao atualizar produto: ${error.message}`, { stack: error.stack, payload: req.body });
        res.status(400).send({ message: "Erro ao atualizar produto.", error: error.message });
    }
};

// Deletar um produto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Produto não encontrado." });
        }
        res.status(200).send({ message: "Produto deletado com sucesso!", product });
    } catch (error) {
        logger.error(`Erro ao deletar produto: ${error.message}`, { stack: error.stack, params: req.params });
        res.status(500).send({ message: "Erro ao deletar produto.", error: error.message });
    }
};
