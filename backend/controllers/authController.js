const Admin = require('../models/Admin');
const StaffRequest = require('../models/StaffRequest');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                username: admin.username,
                role: admin.role,
                fullName: admin.fullName,
                email: admin.email,
                phone: admin.phone,
                branch: admin.branch,
                token: generateToken(admin._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerAdmin = async (req, res) => {
    // This should be protected or removed after initial setup
    const { username, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const admin = await Admin.create({ username, password, role: 'admin' });
        if (admin) {
            res.status(201).json({
                _id: admin._id,
                username: admin.username,
                role: admin.role,
                token: generateToken(admin._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await Admin.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStaffList = async (req, res) => {
    try {
        // Return minimal info for all staff/admins
        const users = await Admin.find({}).select('_id username fullName role branch profileImage');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await Admin.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerStaff = async (req, res) => {
    const { username, password, fullName, email, phone, branch } = req.body;
    try {
        const userExists = await Admin.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await Admin.create({
            username,
            password,
            role: 'staff',
            fullName,
            email,
            phone,
            branch
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                role: user.role,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await Admin.findById(req.admin._id);

        if (user) {
            user.fullName = req.body.fullName || user.fullName;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.branch = req.body.branch || user.branch;

            if (req.body.password) {
                if (user.role === 'admin') {
                    user.password = req.body.password;
                } else {
                    // Create Password Update Request
                    await StaffRequest.create({
                        fullName: user.fullName || user.username,
                        email: user.email,
                        phone: user.phone,
                        branch: user.branch || 'HO',
                        password: req.body.password,
                        type: 'password_update',
                        userId: user._id
                    });

                    // Respond early (don't save password to user yet)
                    await user.save(); // Save other changes (profile info)

                    return res.json({
                        _id: user._id,
                        username: user.username,
                        role: user.role,
                        fullName: user.fullName,
                        email: user.email,
                        phone: user.phone,
                        branch: user.branch,
                        token: generateToken(user._id),
                        message: 'Password change request sent to Admin for approval.'
                    });
                }
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                role: updatedUser.role,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                branch: updatedUser.branch,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const user = await Admin.findById(req.params.id);

        if (user) {
            user.role = req.body.role || user.role;
            await user.save();
            res.json({ message: 'User role updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
