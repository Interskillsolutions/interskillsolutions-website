const Review = require('../models/Review');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
    try {
        // Sort by order (ascending), then by creation date (descending) as fallback
        const reviews = await Review.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (Admin)
const createReview = async (req, res) => {
    const { name, role, review, rating, image } = req.body;

    if (!name || !review) {
        return res.status(400).json({ message: 'Name and review text are required' });
    }

    try {
        // Find the highest order value to place new review at the end
        const lastReview = await Review.findOne().sort({ order: -1 });
        const newOrder = lastReview && lastReview.order ? lastReview.order + 1 : 0;

        const newReview = await Review.create({
            name,
            role,
            review,
            rating,
            image,
            order: newOrder
        });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update review order
// @route   PUT /api/reviews/order
// @access  Private (Admin)
const updateReviewOrder = async (req, res) => {
    const { reviews } = req.body; // Expects array of { _id, order }

    if (!reviews || !Array.isArray(reviews)) {
        return res.status(400).json({ message: 'Invalid data format' });
    }

    try {
        const updates = reviews.map((item, index) => {
            return Review.findByIdAndUpdate(item._id, { order: index });
        });

        await Promise.all(updates);
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin)
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviews,
    createReview,
    updateReviewOrder,
    deleteReview
};
