const mongoose = require('mongoose');

const dualDegreeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "BSc IT", "BCA"
    description: { type: String, required: true },
    highlights: [{ type: String }],
    courses: [{
        title: { type: String },
        topics: [{ type: String }],
        image: { type: String }
    }],
    roadmap: [{
        semester: { type: Number },
        phases: [{
            title: { type: String },
            description: { type: String },
            skills: [{ type: String }]
        }],
        stipend: { type: String }
    }],
    feesROI: {
        totalFees: { type: String },
        stipendDetails: { type: String },
        roiComment: { type: String }
    },
    brochure: { type: String },
    tools: [{ type: String }], // Icon names
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('DualDegree', dualDegreeSchema);
