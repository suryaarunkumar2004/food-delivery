const express = require('express');
const orders = require('../data/orderData');
const menuItems = require('../data/menuData');
const generateId = require('../utils/idGenerator');

const router = express.Router();

router.post('/', (req, res) => {
    const { userId, items } = req.body;

    let totalPrice = 0;
    const orderItems = items.map(item => {
        const menuItem = menuItems.find(m => m.id === item.itemId);
        if (!menuItem) {
            return res.status(400).json({ error: 'Invalid menu item' });
        }
        totalPrice += menuItem.price * item.quantity;
        return { ...menuItem, quantity: item.quantity };
    });

    const newOrder = {
        id: generateId(),
        userId,
        items: orderItems,
        totalPrice,
        status: 'Pending',
        createdAt: new Date(),
    };

    orders.push(newOrder);
    res.status(201).json(newOrder);
});

router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
});

module.exports = router;
