const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // infor cos nhieeu thuoc tinh
    ram: {
        type: String,
        required: true
    },
    cpu: {
        type: String,
        required: true
    },
    main: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Products', productSchema);
