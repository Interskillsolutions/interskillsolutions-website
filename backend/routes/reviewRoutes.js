const express = require('express');
const router = express.Router();
const { getReviews, createReview, updateReviewOrder, deleteReview } = require('../controllers/reviewController');
const { protect, admin, staff } = require('../middleware/authMiddleware');

const multer = require('multer');
const { createCloudinaryStorage } = require('../config/cloudinary');

const storage = createCloudinaryStorage('interskills-reviews');
const upload = multer({ storage });

router.get('/', getReviews);
router.post('/', protect, staff, upload.single('image'), createReview);
router.put('/order', protect, staff, updateReviewOrder);
router.delete('/:id', protect, staff, deleteReview);

module.exports = router;
