const express = require('express');
const routes = require('./routes'); // Your routes.js file
const cron = require('./statusUpdater'); // Your statusUpdater.js file

const app = express();
app.use(express.json());

// Register routes
app.use('/api', routes);

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Food Delivery Backend!');
});

// Start server
const PORT = 8080; // Change to another port if 8080 is in use
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Start CRON job for status updates
cron.startStatusUpdater();
const express = require('express');
const routes = require('./routes'); // Ensure routes.js exists
const cron = require('./statusUpdater'); // Ensure statusUpdater.js exists
