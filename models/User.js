const mongoose = require('mongoose')

// Create schema and export it
const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String
}, {
    timestamps: true
})

module.exports = UserSchema