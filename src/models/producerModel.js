const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    founded: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Producer', producerSchema);