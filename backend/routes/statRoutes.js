const express = require('express');
const { getStats, updateStat } = require('../controllers/statController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getStats).put(protect, updateStat);

module.exports = router;
