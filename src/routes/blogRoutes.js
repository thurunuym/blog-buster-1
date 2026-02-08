const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticate, authorize } = require('../middlewares/auth');

// Public: Anyone can read blogs
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Protected: Only logged-in users can create
router.post('/', authenticate, blogController.createBlog);

// Owner or Admin: Only the author or an admin can update
router.put('/:id', authenticate, blogController.updateBlog);

// Admin Only: Only admins can delete
router.delete('/:id', authenticate, authorize(['Admin']), blogController.deleteBlog);

module.exports = router;