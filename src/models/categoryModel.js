const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    
        required: true
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

module.exports = mongoose.model('Categories', categorySchema)