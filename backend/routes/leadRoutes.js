const express = require('express');
const { createLead, getLeads, updateLead, deleteLead } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(createLead)
    .get(protect, getLeads);

router.route('/:id')
    .put(protect, updateLead)
    .delete(protect, deleteLead);

module.exports = router;
