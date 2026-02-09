const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { createCloudinaryStorage } = require('../config/cloudinary');
const { cloudinary } = require('../config/cloudinary');

const storage = createCloudinaryStorage('interskills-partners');
const upload = multer({ storage });

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
            logo: req.file.path
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

        // Delete image from Cloudinary
        if (partner.logo) {
            const publicId = partner.logo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`interskills-partners/${publicId}`);
        }

        await partner.deleteOne();
        res.json({ msg: 'Partner removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
