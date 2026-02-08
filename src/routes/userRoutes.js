const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');

// Admin Only
router.get('/', authenticate, authorize(['Admin']), userController.getAllUsers);

// Protected: Users can see their own profile
router.get('/:id', authenticate, userController.getUserById);

module.exports = router;