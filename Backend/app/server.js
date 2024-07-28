const express = require('express');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
const routes = require('../routes/router');
const db = require('../services/database');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();

// Place this line before any routes are defined
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    credentials: true
}));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Make sure to set this environment variable
});

app.post('/api/openai', async (req, res) => {
    try {
        console.log('Received request:', req.body);
        if (!req.body.message) {
            return res.status(400).send({ error: 'No message provided' });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: req.body.message }],
            temperature: 0.7,
        });

        console.log('OpenAI API Response:', JSON.stringify(completion, null, 2));
        res.json(completion.choices[0].message);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({
            error: 'Error calling OpenAI API',
            details: error.toString(),
            stack: error.stack,
            message: error.message
        });
    }
});



app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    credentials: true
}));

// Configuration for Auth0
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a260d53acdc75b87acb218c42bc1c09b885c348f537ba2486d39790078406372',
    baseURL: 'http://localhost:8000',
    clientID: 'WUYhZcOgzKvsrDZUR3LOSSLpUfJGq2jd',
    issuerBaseURL: 'https://dev-3selmw8fy6fyr2gt.us.auth0.com/',
    routes: {
        callback: '/callback'
    }
};

app.use(auth(config));

// Calling router
app.use('/', routes);

// Port server is listening on
const port = 8000;

// Protected route to get user profile information
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));  // Protected route to get user profile information
});

// Callback route to redirect to the frontend after successful login
app.get('/', (req, res) => {
    res.redirect('http://localhost:5173');
});

app.get('/check-user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const userExists = await db.IdExist(userId);
        res.status(200).send({ exists: userExists });
    } catch (error) {
        console.error('Error checking user existence:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
app.post('/add-user', async (req, res) => {
    const user = req.body;
    try {
        const result = await db.addUsers(user);
        if (result === null) {
            res.status(400).send({ error: 'User already exists' });
        } else {
            res.status(200).send({ success: 'User added successfully' });
        }
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await db.listUser();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error listing users:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


app.get('/users-schema', async (req, res) => {
    try {
        const schema = await db.getUsersSchema();
        res.status(200).json(schema);
    } catch (error) {
        console.error('Error retrieving users schema:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/add-user-recipe', async (req, res) => {
    const userRecipe = req.body;
    try {
        await db.addUserRecipe(userRecipe);
        res.status(200).send({ success: 'Recipe added successfully' });
    } catch (error) {
        console.error('Error adding user recipe:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Running the server
app.listen(port, async () => {
    // Initialize the database connection
    await db.initDb();

    // Create the tables
    await db.createTables();

    // Test adding a user

    app.get('/recipes', async (req, res) => {
        try {
            const recipes = await db.listRecipe();
            res.status(200).send(recipes);
        } catch (error) {
            console.error('Error listing recipes:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });

    // Test adding a user recipe
    const userRecipe = {
        auth_id: "user123",
        recipe_name: "Chicken Salad",
        recipe: "Mix chicken, lettuce, and dressing."
    };
    await db.addUserRecipe(userRecipe);


    // Test listing users
    const users = await db.listUser();
    console.log('List of users:', users);

    // Test listing recipes
    const recipes = await db.listRecipe();
    console.log('List of recipes:', recipes);

    // Test getting tables
    const tables = await db.getTables();
    console.log('List of tables:', tables);
});
