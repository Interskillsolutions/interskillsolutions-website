const express = require('express');
const { createLead, getLeads } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(createLead).get(protect, getLeads);

module.exports = router;
