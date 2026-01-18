const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Optional: Remove in production

module.exports = router;
