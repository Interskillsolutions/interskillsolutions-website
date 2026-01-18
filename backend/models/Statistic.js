const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    label: { type: String, required: true, unique: true }, // e.g., "Placed Students"
    value: { type: String, required: true }, // e.g., "1000+"
    icon: { type: String }, // Optional icon name
});

module.exports = mongoose.model('Statistic', statisticSchema);
