const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    inventory : {
        type: Number,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    img : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    producer : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Products', productSchema);
