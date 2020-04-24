const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    items: [String],
    name: String,
    description: String
})

export const Category = new.mongoose.model('categories', CategorySchema);