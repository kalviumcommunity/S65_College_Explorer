// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a route for '/ping'
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Set the port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
