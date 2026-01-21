const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
    try {
        const lead = new Lead(req.body);
        const createdLead = await lead.save();
        res.status(201).json(createdLead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getLeads = async (req, res) => {
    try {
        const { view } = req.query; // 'deleted' or undefined
        let query = {};

        // If user is Staff, strict filtering: Only active leads
        if (req.admin.role !== 'admin') {
            query.isDeleted = false;
        } else {
            // If Admin
            if (view === 'deleted') {
                query.isDeleted = true;
            } else {
                query.isDeleted = false; // Default view for admin is also active leads
            }
        }

        const leads = await Lead.find(query)
            .populate('deletedBy', 'username') // Populate who deleted it
            .sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const { status, remark } = req.body;
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        if (status) lead.status = status;

        if (remark) {
            lead.remarks.push({
                text: remark,
                by: req.admin._id,
                name: req.admin.username
            });
        }

        const updatedLead = await lead.save();
        res.json(updatedLead);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: 'Lead not found' });

        const { type } = req.query; // 'permanent' to force delete

        // Staff can ONLY soft delete
        if (req.admin.role !== 'admin') {
            if (lead.isDeleted) {
                return res.status(400).json({ message: 'Lead already deleted' });
            }
            lead.isDeleted = true;
            lead.deletedBy = req.admin._id;
            lead.deletedAt = Date.now();
            await lead.save();
            return res.json({ message: 'Lead moved to trash' });
        }

        // Admin Logic
        if (type === 'permanent') {
            await lead.deleteOne();
            return res.json({ message: 'Lead permanently deleted' });
        } else {
            // Admin soft delete
            lead.isDeleted = true;
            lead.deletedBy = req.admin._id;
            lead.deletedAt = Date.now();
            await lead.save();
            return res.json({ message: 'Lead moved to trash' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
