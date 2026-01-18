const express = require('express');
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for brochure upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/courses/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, 'brochure-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF brochures are allowed!'), false);
        }
    }
});

router.route('/').get(getCourses).post(protect, admin, upload.single('brochure'), createCourse);
router
    .route('/:id')
    .get(getCourseById)
    .put(protect, admin, upload.single('brochure'), updateCourse)
    .delete(protect, admin, deleteCourse);

module.exports = router;
