const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    telephone: String,
    password: String,
    orders: [String],
    isAdmin: Boolean
})

export const User = new.mongoose.model('users', UserSchema);