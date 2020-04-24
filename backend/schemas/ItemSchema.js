const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    costomers: [String],
    quantity: Number,
    image: String,
    price: Number,
    company: {
        type: String,
        required: false
    },
    categoryId: String
})

export const User = new.mongoose.model('items', UserSchema);