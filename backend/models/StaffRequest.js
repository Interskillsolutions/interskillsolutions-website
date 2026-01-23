const mongoose = require('mongoose');

const staffRequestSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    type: {
        type: String,
        enum: ['registration', 'password_update'],
        default: 'registration'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('StaffRequest', staffRequestSchema);
