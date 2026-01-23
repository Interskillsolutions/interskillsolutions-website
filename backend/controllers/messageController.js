const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const { userId, room } = req.query; // userId for DM, room='general' for public
        let query = {};

        if (room === 'general' || !userId) {
            query = { recipient: null };
        } else if (userId) {
            // DM: (sender=me & recipient=other) OR (sender=other & recipient=me)
            query = {
                $or: [
                    { sender: req.admin._id, recipient: userId },
                    { sender: userId, recipient: req.admin._id }
                ]
            };
        }

        const messages = await Message.find(query)
            .sort({ timestamp: 1 })
            .limit(100);

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveMessage = async (req, res) => {
    // This is optional if we save via Socket, but good to have API
    const { content } = req.body;
    try {
        const message = await Message.create({
            sender: req.admin._id,
            senderName: req.admin.username,
            content
        });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
