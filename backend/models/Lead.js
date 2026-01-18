const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    interest: { type: String }, // Course name
    source: { type: String, required: true }, // Brochure, Consultation, Contact
    status: { type: String, default: 'New' }, // New, Contacted, Converted
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
