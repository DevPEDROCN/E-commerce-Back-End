// E-commerce-Back-End/src/controllers/orderController.js

const Order = require('../models/Order');
const Product = require('../models/product');
const logger = require('../config/logger');

// Criar um novo pedido
exports.createOrder = async (req, res) => {
    try {
        const { products: orderProducts, shippingAddress } = req.body;
        const userId = req.user._id;

        let totalAmount = 0;
        const productsForOrder = [];

        // Validar produtos e calcular total
        for (let item of orderProducts) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).send({ message: `Produto com ID ${item.product} não encontrado.` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).send({ message: `Estoque insuficiente para o produto ${product.name}.` });
            }

            // Atualizar estoque
            product.stock -= item.quantity;
            await product.save();

            totalAmount += product.price * item.quantity;
            productsForOrder.push({
                product: product._id,
                quantity: item.quantity,
                priceAtOrder: product.price
            });
        }

        const order = new Order({
            user: userId,
            products: productsForOrder,
            totalAmount,
            shippingAddress
        });

        await order.save();

        // Popula produtos e usuário
        await order.populate([
            { path: 'products.product' },
            { path: 'user', select: 'name email' }
        ]);

        res.status(201).send(order);
    } catch (error) {
        logger.error(`Erro ao criar pedido: ${error.message}`, { stack: error.stack, payload: req.body, userId: req.user ? req.user._id : 'N/A' });
        res.status(400).send({ message: "Erro ao criar pedido.", error: error.message });
    }
};

// Obter pedidos do usuário autenticado
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
                                  .populate('products.product')
                                  .populate('user', 'name email');
        res.status(200).send(orders);
    } catch (error) {
        logger.error(`Erro ao buscar pedidos do usuário ${req.user._id}: ${error.message}`, { stack: error.stack });
        res.status(500).send({ message: "Erro ao buscar pedidos.", error: error.message });
    }
};

// Obter um pedido específico por ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
                                 .populate('products.product')
                                 .populate('user', 'name email');

        if (!order) {
            return res.status(404).send({ message: "Pedido não encontrado ou você não tem permissão para vê-lo." });
        }
        res.status(200).send(order);
    } catch (error) {
        logger.error(`Erro ao buscar pedido ${req.params.id} para o usuário ${req.user._id}: ${error.message}`, { stack: error.stack });
        res.status(500).send({ message: "Erro ao buscar pedido.", error: error.message });
    }
};

// Atualizar status do pedido
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const orderId = req.params.id;

    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
        return res.status(400).send({ message: 'Status inválido.' });
    }

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).send({ message: "Pedido não encontrado." });
        }

        order.status = status;
        await order.save();

        await order.populate([
            { path: 'products.product' },
            { path: 'user', select: 'name email' }
        ]);

        res.status(200).send(order);
    } catch (error) {
        logger.error(`Erro ao atualizar status do pedido ${orderId}: ${error.message}`, { stack: error.stack, payload: req.body });
        res.status(400).send({ message: "Erro ao atualizar status do pedido.", error: error.message });
    }
};

// Obter todos os pedidos (APENAS PARA ADMINS)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
                                  .populate('products.product')
                                  .populate('user', 'name email');
        res.status(200).send(orders);
    } catch (error) {
        logger.error(`Erro ao buscar todos os pedidos: ${error.message}`, { stack: error.stack });
        res.status(500).send({ message: "Erro ao buscar todos os pedidos.", error: error.message });
    }
};
