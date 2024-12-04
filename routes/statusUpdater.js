const cron = require('node-cron');

// In-memory order status queue
let orderStatusQueue = [];  // This will store order IDs to update their statuses

const updateOrderStatus = () => {
    if (orderStatusQueue.length === 0) return;
    
    const orderId = orderStatusQueue.shift(); // Process one order at a time
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    switch (order.status) {
        case 'Preparing':
            order.status = 'Out for Delivery';
            break;
        case 'Out for Delivery':
            order.status = 'Delivered';
            break;
        case 'Delivered':
            // Do nothing when delivered
            break;
        default:
            order.status = 'Preparing';
            break;
    }

    console.log(`Order ${order.id} status updated to: ${order.status}`);
};

// Start CRON job for automatic status updates every minute
const startStatusUpdater = () => {
    cron.schedule('* * * * *', updateOrderStatus);  // Runs every minute
};

module.exports = { startStatusUpdater };
const updateOrderStatus = () => {
    try {
        if (orderStatusQueue.length === 0) return;
        
        const orderId = orderStatusQueue.shift(); // Process one order at a time
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        switch (order.status) {
            case 'Preparing':
                order.status = 'Out for Delivery';
                break;
            case 'Out for Delivery':
                order.status = 'Delivered';
                break;
            case 'Delivered':
                break;
            default:
                order.status = 'Preparing';
                break;
        }

        console.log(`Order ${order.id} status updated to: ${order.status}`);
    } catch (error) {
        console.error('Error in status update:', error);
    }
};
