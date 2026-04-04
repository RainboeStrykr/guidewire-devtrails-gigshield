const mongoose = require('mongoose');

const triggerAlertSchema = new mongoose.Schema({
    zone: {
        type: String,
        required: true,
    },
    intensity: {
        type: Number,
        required: true
    },
    triggerType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Resolved'],
        default: 'Active'
    }
}, { timestamps: true });

module.exports = mongoose.model('TriggerAlert', triggerAlertSchema);
