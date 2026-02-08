const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

router.post('/', authenticate, blogController.createBlog);

router.put('/:id', authenticate, blogController.updateBlog);

router.delete('/:id', authenticate, authorize(['Admin']), blogController.deleteBlog);

module.exports = router;