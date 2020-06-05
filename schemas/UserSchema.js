const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    username: {
        type: String,
        required: false
    },
    telephone: {
        type: String,
        required: false
    },
    password: String,
    orders: [String],
    isAdmin: Boolean,
    isCompany: Boolean,
    adress: String,
    companyInfo: {
        name: String,
        bin: String,
        contacts: [{
            contactType: String,
            contact: String,
            contactName: String
        }]
    }
})

module.exports = User = new mongoose.model('users', UserSchema);