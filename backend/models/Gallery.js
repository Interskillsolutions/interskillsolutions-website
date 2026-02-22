const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    featuredImage: {
        type: String,
        required: [true, 'Featured image is required']
    },
    images: [{
        type: String
    }],
    story: {
        type: String
    },
    eventDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
