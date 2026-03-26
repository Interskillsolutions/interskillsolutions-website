const express = require('express');
const router = express.Router();
const { 
    getDualDegrees, 
    getDualDegreeById, 
    createDualDegree, 
    updateDualDegree, 
    deleteDualDegree 
} = require('../controllers/dualDegreeController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer config for brochure uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/dual-degree/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
            return cb(new Error('Only documents are allowed'));
        }
        cb(null, true);
    }
});

router.route('/')
    .get(getDualDegrees)
    .post(protect, admin, upload.single('brochure'), createDualDegree);

router.route('/:id')
    .get(getDualDegreeById)
    .put(protect, admin, upload.single('brochure'), updateDualDegree)
    .delete(protect, admin, deleteDualDegree);

module.exports = router;
