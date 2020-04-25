const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: String,
    items: [{
        itemId: String,
        quantity: String,
        price: Number,
    }],
    totalPrice: Number,
    deliveryPrice: Number,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Order = new mongoose.model('orders', OrderSchema);