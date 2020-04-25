const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    items: [String],
    name: String,
    description: String
})

module.exports = Category = new mongoose.model('categories', CategorySchema);