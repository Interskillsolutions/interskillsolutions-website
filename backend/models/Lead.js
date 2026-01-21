const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    interest: { type: String }, // Course name
    source: { type: String, required: true }, // Brochure, Consultation, Contact
    status: { type: String, enum: ['New', 'Handled', 'Completed'], default: 'New' },
    remarks: [{
        text: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
        name: String, // Store name directly for easier display
        date: { type: Date, default: Date.now }
    }],
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    deletedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
