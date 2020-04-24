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

export const Order = new.mongoose.model('orders', OrderSchema);