const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    mode: { type: String, required: true }, // Online, Offline, Hybrid
    fees: { type: String },
    image: { type: String }, // URL or path
    brochure: { type: String }, // Path to uploaded brochure PDF
    category: { type: String }, // IT, Design, etc.
    tags: [{ type: String }], // Bestseller, Trending, etc.
    highlights: [{ type: String }], // Key features like "100% Placement"
    syllabus: [{
        title: { type: String }, // Module title
        topics: [{ type: String }] // List of topics in module
    }],
    tools: [{ type: String }], // List of tools covered (Python, SQL, etc.)
    curriculum: [{ type: String }], // Keeping legacy field for backward compatibility if needed
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
