const express = require('express');
const router = express.Router();

// Sample in-memory data for Menu Items and Orders
let menu = [];
let orders = [];
let orderStatusQueue = [];

// Menu Management
router.get('/menu', (req, res) => {
    res.json(menu);
});

router.post('/menu', (req, res) => {
    const { name, description, price, category } = req.body;
    const newItem = { id: menu.length + 1, name, description, price, category };
    menu.push(newItem);
    res.status(201).json(newItem);
});

// Orders Management
router.post('/orders', (req, res) => {
    const { userId, items } = req.body;
    const totalPrice = items.reduce((total, itemId) => {
        const item = menu.find((i) => i.id === itemId);
        return item ? total + item.price : total;
    }, 0);

    const order = {
        id: orders.length + 1,
        userId,
        items,
        totalPrice,
        status: 'Preparing',
        deliveryTime: new Date().toISOString(),
    };

    orders.push(order);
    orderStatusQueue.push(order.id);  // Add order to status update queue
    res.status(201).json(order);
});

router.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
});

// User Authentication (simplified example)
router.post('/auth/register', (req, res) => {
    // Register new user logic here
    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/auth/login', (req, res) => {
    // Login user logic here
    res.json({ message: 'User logged in successfully' });
});

module.exports = router;
