const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize(['Admin']), userController.getAllUsers);

router.get('/:id', authenticate, userController.getUserById);

module.exports = router;