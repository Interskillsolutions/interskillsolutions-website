const express = require('express');
const { loginAdmin, registerAdmin, getUsers, deleteUser, registerStaff } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Initial Admin Setup
router.get('/users', protect, admin, getUsers);
router.delete('/users/:id', protect, admin, deleteUser);
router.post('/staff', protect, admin, registerStaff);

module.exports = router;
