const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    customers: [String],
    quantity: Number,
    image: String,
    price: Number,
    article: String,
    company: {
        type: String,
        required: false
    },
    categoryId: {
        type: String,
        required: false
    }
})

module.exports = Item = new mongoose.model('items', ItemSchema);