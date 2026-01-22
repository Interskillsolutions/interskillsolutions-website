const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    priority: {
        type: Number,
        default: 0,
        // Lower number means higher priority (e.g., 1 is top)
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
