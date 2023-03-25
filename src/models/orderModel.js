
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   status: {
        type: String,
        enum: ['ordering','pending', 'confirmed', 'shipped', 'delivered', 'canceled'],
        default: 'ordering'
    },
    totalprice: {
    
        type: Number
    },
    orderDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderDetail'
    }],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Order', orderSchema);