// server.js
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser'); // Required to parse request bodies

// Serve static files from the startup directory
app.use(express.static('startup'));
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Array to store comments (in-memory "database" for demonstration purposes)
let comments = [
    { username: 'SuperMario123', comment: 'Wahoo my dudes', timestamp: new Date() },
    { username: 'Mr. L,', comment: 'you suck mario', timestamp: new Date() },
    { username: 'Princess Bro-stool', comment: 'Have you guys ever noticed that toad kinda looks like a...', timestamp: new Date() }];

// Endpoints VVV

// Endpoint to get all comments
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

// Endpoint to add a new comment
app.post('/api/comments', (req, res) => {
    const { username, comment } = req.body;
    if (!username || !comment) {
        return res.status(400).json({ error: 'Both username and comment are required' });
    }
    const newComment = { username, comment, timestamp: new Date() };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});