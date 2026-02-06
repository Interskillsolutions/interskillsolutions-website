const express = require('express');
const router = express.Router();
const { getMessages, saveMessage, markMessagesAsRead } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMessages).post(protect, saveMessage);
router.route('/mark-read').put(protect, markMessagesAsRead);

module.exports = router;
