const express = require('express');
const router = express.Router();
const { getReviews, createReview, updateReviewOrder, deleteReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

const multer = require('multer');
const { createCloudinaryStorage } = require('../config/cloudinary');

const storage = createCloudinaryStorage('interskills-reviews');
const upload = multer({ storage });

router.get('/', getReviews);
router.post('/', protect, admin, upload.single('image'), createReview);
router.put('/order', protect, admin, updateReviewOrder);
router.delete('/:id', protect, admin, deleteReview);

module.exports = router;
