const pool = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.execute('SELECT id, username, email, role FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const [users] = await pool.execute(
            'SELECT id, username, email, role FROM users WHERE id = ?', 
            [req.params.id]
        );
        if (users.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(users[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};