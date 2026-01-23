const express = require('express');
const router = express.Router();
const { getMessages, saveMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMessages).post(protect, saveMessage);

module.exports = router;
