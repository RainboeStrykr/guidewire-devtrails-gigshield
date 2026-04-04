const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    policyId: {
        type: String,
        required: true,
        unique: true
    },
    riderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rider',
        required: true
    },
    tier: {
        type: String,
        enum: ['Basic', 'Standard', 'Pro'],
        required: true
    },
    premium: {
        type: Number,
        required: true
    },
    maxCoverage: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Cancelled'],
        default: 'Active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
