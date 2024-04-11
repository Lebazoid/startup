// server.js
const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Define endpoints
app.get('/api/your-endpoint', (req, res) => {
    // Handle the request and send back a response
    res.json({ message: 'This is your endpoint response' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});