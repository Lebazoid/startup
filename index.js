const express = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 3000;
const dbConfig = require('./dbConfig');

const url = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.hostname}/`;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Array to store comments (in-memory "database" for demonstration purposes)
let comments = [
    { username: 'SuperMario123', comment: 'Wahoo! Its a me! Mario', timestamp: new Date() },
    { username: 'Mr_L_420', comment: 'You stink Mario!', timestamp: new Date() },
    { username: 'KingKoopa', comment: 'Haha get wrecked', timestamp: new Date() }
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

// Object to store user profiles (in-memory "database" for demonstration purposes)
let userProfiles = {};

// Endpoint to retrieve user profile data
apiRouter.get('/profile', (req, res) => {
    const username = req.query.username; // Assuming username is passed in query parameter
    const userProfile = userProfiles[username];
    if (!userProfile) {
        return res.status(404).json({ error: 'User profile not found' });
    }
    res.json(userProfile);
});

// Endpoint to update user profile data
apiRouter.post('/profile', (req, res) => {
    const username = req.body.username; // Assuming username is passed in request body
    const { bio, favoriteCharacter } = req.body;

    // Update user profile in storage
    userProfiles[username] = { bio, favoriteCharacter };

    res.json({ message: 'User profile updated successfully' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});