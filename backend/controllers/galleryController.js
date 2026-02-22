const Gallery = require('../models/Gallery');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get gallery item by ID
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryItemById = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new gallery item
// @route   POST /api/gallery
// @access  Private (Admin)
exports.createGalleryItem = async (req, res) => {
    try {
        const { title, description, story, eventDate } = req.body;

        if (!req.files || !req.files.featuredImage) {
            return res.status(400).json({ message: 'Featured image is required' });
        }

        const featuredImage = req.files.featuredImage[0].path;
        const images = req.files.images ? req.files.images.map(file => file.path) : [];

        const newItem = await Gallery.create({
            title,
            description,
            story,
            eventDate,
            featuredImage,
            images
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Private (Admin)
exports.updateGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        const { title, description, story, eventDate } = req.body;

        if (req.files) {
            if (req.files.featuredImage) {
                // Delete old featured image if it's on cloudinary
                if (item.featuredImage.includes('cloudinary')) {
                    const publicId = item.featuredImage.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`interskills-gallery/${publicId}`).catch(err => console.error(err));
                }
                item.featuredImage = req.files.featuredImage[0].path;
            }

            if (req.files.images) {
                // For simplicity, we'll append new images. 
                // In a more complex app, we might want to manage individual deletions.
                const newImages = req.files.images.map(file => file.path);
                item.images = [...item.images, ...newImages];
            }
        }

        item.title = title || item.title;
        item.description = description || item.description;
        item.story = story || item.story;
        item.eventDate = eventDate || item.eventDate;

        const updatedItem = await item.save();
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private (Admin)
exports.deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Gallery item not found' });
        }

        // Delete images from Cloudinary
        const imagesToDelete = [item.featuredImage, ...item.images];
        for (const img of imagesToDelete) {
            if (img && img.includes('cloudinary')) {
                const publicId = img.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`interskills-gallery/${publicId}`).catch(err => console.error(err));
            }
        }

        await item.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
