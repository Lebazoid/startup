const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db(config.databaseName);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

// Disconnect from MongoDB
async function disconnectFromDatabase() {
    try {
        await client.close();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error('Error disconnecting from the database:', error);
    }
}

// Initialize collections
let userCollection;
let scoreCollection;

function initializeCollections() {
    userCollection = db.collection('users');
    scoreCollection = db.collection('scores');
}

// Test database connection
async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log('Database ping successful');
    } catch (error) {
        console.error('Error pinging database:', error);
    }
}

// Create user
async function createUser(email, password) {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const token = uuid.v4();
        const user = {
            email: email,
            password: passwordHash,
            token: token
        };
        await userCollection.insertOne(user);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Get user by email
async function getUserByEmail(email) {
    try {
        return await userCollection.findOne({ email: email });
    } catch (error) {
        console.error('Error getting user by email:', error);
        throw error;
    }
}

// Get user by token
async function getUserByToken(token) {
    try {
        return await userCollection.findOne({ token: token });
    } catch (error) {
        console.error('Error getting user by token:', error);
        throw error;
    }
}