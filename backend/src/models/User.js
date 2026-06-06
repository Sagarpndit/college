const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    status: { type: Number, default: 0 },    // 1 = active, 0 = inactive
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);