const express = require('express');
const router = express.Router();
const {
    getGalleryItems,
    getGalleryItemById,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
} = require('../controllers/galleryController');
const { protect, staff } = require('../middleware/authMiddleware');
const multer = require('multer');
const { createCloudinaryStorage } = require('../config/cloudinary');

const storage = createCloudinaryStorage('interskills-gallery');
const upload = multer({ storage });

router.get('/', getGalleryItems);
router.get('/:id', getGalleryItemById);

// Admin/Staff routes
router.post('/', protect, staff, upload.fields([
    { name: 'featuredImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), createGalleryItem);

router.put('/:id', protect, staff, upload.fields([
    { name: 'featuredImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), updateGalleryItem);

router.delete('/:id', protect, staff, deleteGalleryItem);

module.exports = router;
