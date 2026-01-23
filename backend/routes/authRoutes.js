const express = require('express');
const { loginAdmin, registerAdmin, getUsers, deleteUser, registerStaff, updateProfile, getStaffList, updateUserRole } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Initial Admin Setup
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/staff/list', protect, getStaffList);
router.put('/users/:id/role', protect, admin, updateUserRole);
router.post('/staff', protect, admin, registerStaff);
router.put('/profile', protect, updateProfile);

module.exports = router;
