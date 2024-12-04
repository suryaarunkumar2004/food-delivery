const express = require('express');
const menuItems = require('../data/menuData');
const generateId = require('../utils/idGenerator');

const router = express.Router();

router.post('/', (req, res) => {
    const { name, description, price, category } = req.body;

    const newItem = { id: generateId(), name, description, price, category, availability: true };
    menuItems.push(newItem);

    res.status(201).json(newItem);
});

router.get('/', (req, res) => {
    res.json(menuItems);
});

module.exports = router;
