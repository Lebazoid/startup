const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });
  
  // GetAuth token for the provided credentials
  apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth token if stored in cookie
  apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
  // GetUser returns information about a user
  apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
      const token = req?.cookies.token;
      res.send({ email: user.email, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
  });
  
  // secureApiRouter verifies credentials for endpoints
  var secureApiRouter = express.Router();
  apiRouter.use(secureApiRouter);
  
  secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });

// Endpoint to get all comments
apiRouter.get('/comments', async (req, res) => {
    try {
        const comments = await DB.getAllComments();
        res.json(comments);
    } catch (error) {
        console.error('Error getting all comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to add a new comment
apiRouter.post('/comments', async (req, res) => {
    try {
        const { username, comment } = req.body;
        if (!username || !comment) {
            return res.status(400).json({ error: 'Both username and comment are required' });
        }
        const newComment = { username, comment, timestamp: new Date() };
        await DB.addComment(newComment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding new comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to retrieve user profile data
apiRouter.get('/profile', async (req, res) => {
    try {
        const username = req.query.username;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        const userProfile = await DB.getUserProfile(username);
        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        res.json(userProfile);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update user profile data
apiRouter.post('/profile', async (req, res) => {
    try {
        const { username, bio, favoriteCharacter } = req.body;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        await DB.updateUserProfile(username, { bio, favoriteCharacter });
        res.json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});