const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model('Users', userSchema)
