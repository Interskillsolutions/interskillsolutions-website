const StaffRequest = require('../models/StaffRequest');

// @desc    Submit a new staff request
// @route   POST /api/requests
// @access  Public
const createRequest = async (req, res) => {
    const { fullName, email, phone, branch, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const request = await StaffRequest.create({
            fullName,
            email,
            phone,
            branch,
            password
        });
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all pending requests
// @route   GET /api/requests
// @access  Private/Admin
const getRequests = async (req, res) => {
    try {
        // Find all requests that are pending
        const requests = await StaffRequest.find({ status: 'Pending' }).sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a request
// @route   DELETE /api/requests/:id
// @access  Private/Admin
const deleteRequest = async (req, res) => {
    try {
        const request = await StaffRequest.findById(req.params.id);

        if (request) {
            await request.deleteOne();
            res.json({ message: 'Request removed' });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createRequest,
    getRequests,
    deleteRequest
};
