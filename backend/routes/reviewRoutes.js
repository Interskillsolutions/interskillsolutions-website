const express = require('express');
const router = express.Router();
const { getReviews, createReview, updateReviewOrder, deleteReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getReviews);
router.post('/', protect, admin, createReview);
router.put('/order', protect, admin, updateReviewOrder);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;
