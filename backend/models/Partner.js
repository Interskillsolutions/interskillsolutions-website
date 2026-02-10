const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,
        required: true
    },
    website: {
        type: String, // URL of the company/partner website
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Partner', PartnerSchema);
