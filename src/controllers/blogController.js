const pool = require('../config/db');
const { createSummary } = require('../services/blogService');

exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const summary = createSummary(content);
    const authorId = req.user.id;

    try {
        const [result] = await pool.execute(
            'INSERT INTO blogs (title, content, summary, author_id) VALUES (?, ?, ?, ?)',
            [title, content, summary, authorId]
        );
        res.status(201).json({ id: result.insertId, title, summary });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllBlogs = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM blogs ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [String(limit), String(offset)]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const [blogs] = await pool.execute('SELECT * FROM blogs WHERE id = ?', [req.params.id]);
        if (blogs.length === 0) return res.status(404).json({ error: 'Blog not found' });
        res.json(blogs[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    const { title, content } = req.body;
    const blogId = req.params.id;

    try {
        const [blogs] = await pool.execute('SELECT author_id FROM blogs WHERE id = ?', [blogId]);
        if (blogs.length === 0) return res.status(404).json({ error: 'Blog not found' });

        if (blogs[0].author_id !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Not authorized to update this blog' });
        }

        
        const summary = createSummary(content);
        await pool.execute(
            'UPDATE blogs SET title = ?, content = ?, summary = ? WHERE id = ?',
            [title, content, summary, blogId]
        );
        res.json({ message: 'Blog updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM blogs WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};