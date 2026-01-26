const express = require('express');
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/courseController');
const { protect, admin, staff } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getCourses).post(protect, staff, createCourse);
router
    .route('/:id')
    .get(getCourseById)
    .put(protect, staff, updateCourse)
    .delete(protect, staff, deleteCourse);

module.exports = router;
