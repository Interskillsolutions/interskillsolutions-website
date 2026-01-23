const express = require('express');
const router = express.Router();
const { createRequest, getRequests, deleteRequest, approveRequest } = require('../controllers/requestController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', createRequest);
router.get('/', protect, admin, getRequests);
router.delete('/:id', protect, admin, deleteRequest);

module.exports = router;
