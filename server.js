const express = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Array to store comments (in-memory "database" for demonstration purposes)
let comments = [
    { username: 'SuperMario123', comment: 'Wahoo my dudes', timestamp: new Date() },
    { username: 'Mr. L,', comment: 'you suck mario', timestamp: new Date() },
    { username: 'Princess Bro-stool', comment: 'Have you guys ever noticed that toad kinda looks like a...', timestamp: new Date() }
];

// Endpoint to get all comments
apiRouter.get('/comments', (_req, res) => {
    res.json(comments);
});

// Endpoint to add a new comment
apiRouter.post('/comments', (req, res) => {
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