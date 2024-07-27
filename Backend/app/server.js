const express = require('express');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
const routes = require('../routes/router');
const db = require('../services/database');

// App
const app = express();

app.use(express.json());

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

// Running the server
app.listen(port, async () => {
    // Initialize the database connection
    await db.initDb();

    // Create the tables
    await db.createTables();

    // Test adding a user
    const user = {
        auth_id: "user123",
        user_name: "John Doe",
        birthdate: '2020-01-15',
        initial_weight: 70,
        goal_weight: 65,
        height: 175,
        gender: "male",
        activity_level: "moderate"
    };
    await db.addUsers(user);

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
