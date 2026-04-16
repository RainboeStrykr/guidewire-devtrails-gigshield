const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    zone: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    fraudScore: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Rider', riderSchema);
