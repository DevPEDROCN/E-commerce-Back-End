// E-commerce-Back-End/src/models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Remove espaços em branco do início e fim
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Preço não pode ser negativo
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // Estoque não pode ser negativo
        default: 0 // Valor padrão se não for fornecido
    },
    imageUrl: {
        type: String,
        default: 'no-image.png' // Imagem padrão
    },
    createdAt: {
        type: Date,
        default: Date.now // Data de criação automática
    }
});

module.exports = mongoose.model('Product', productSchema);