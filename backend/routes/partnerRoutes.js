const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/partners/';
        // Ensure directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, 'partner-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|svg/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Images Only!'));
        }
    }
});

const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/partners
// @desc    Get all partners
// @access  Public
router.get('/', async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/partners
// @desc    Add a new partner
// @access  Private
router.post('/', protect, upload.single('logo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'Please upload a logo image' });
        }

        const newPartner = new Partner({
            name: req.body.name,
            logo: `/uploads/partners/${req.file.filename}`
        });

        const partner = await newPartner.save();
        res.json(partner);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/partners/:id
// @desc    Delete a partner
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);

        if (!partner) {
            return res.status(404).json({ msg: 'Partner not found' });
        }

        // Delete image file
        const imagePath = path.join(__dirname, '..', partner.logo);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await partner.deleteOne();
        res.json({ msg: 'Partner removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
