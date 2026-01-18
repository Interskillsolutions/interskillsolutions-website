const Statistic = require('../models/Statistic');

exports.getStats = async (req, res) => {
    try {
        const stats = await Statistic.find({});
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStat = async (req, res) => {
    try {
        const { label, value } = req.body;
        const stat = await Statistic.findOne({ label });
        if (stat) {
            stat.value = value;
            const updatedStat = await stat.save();
            res.json(updatedStat);
        } else {
            // Create if not exists
            const newStat = await Statistic.create({ label, value });
            res.status(201).json(newStat);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
