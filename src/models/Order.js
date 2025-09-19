// E-commerce-Back-End/src/models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Referência ao ID do usuário
        ref: 'User', // Nome do modelo de usuário
        required: true
    },
    products: [ // Um array de produtos no pedido
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, // Referência ao ID do produto
                ref: 'Product', // Nome do modelo de produto
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            priceAtOrder: { // Preço do produto no momento do pedido (para histórico)
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], // Status possíveis
        default: 'pending'
    },
    shippingAddress: { // Endereço de entrega (poderia ser um sub-documento mais complexo)
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);