const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // No two users can share the same email
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user', // Default role for new users is 'user'
    },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

module.exports = mongoose.model('User', UserSchema);