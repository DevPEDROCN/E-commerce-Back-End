// E-commerce-Back-End/src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} não é um email válido!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware: Hash da senha antes de salvar
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Método para comparar senha
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Método para gerar token JWT
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString(), isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

// Método para retornar um perfil público do usuário (sem senha)
userSchema.methods.getPublicProfile = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
};

module.exports = mongoose.model('User', userSchema);