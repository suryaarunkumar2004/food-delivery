const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../data/userData');
const generateId = require('../utils/idGenerator');

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

router.post('/register', (req, res) => {
    const { name, email, password, phone } = req.body;

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = { id: generateId(), name, email, password, phone };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ token });
});

module.exports = router;
