const express = require('express');
const routes = require('../routes/router');
const { auth } = require('express-openid-connect');
const db = require('../services/database');

// App 
const app = express();

// Configuration for auth0 
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a260d53acdc75b87acb218c42bc1c09b885c348f537ba2486d39790078406372',
    baseURL: 'http://localhost:8000/',
    clientID: 'WUYhZcOgzKvsrDZUR3LOSSLpUfJGq2jd',
    issuerBaseURL: 'https://dev-3selmw8fy6fyr2gt.us.auth0.com/'
  };
  
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(config));

  app.use('/', routes);
  
// Port server is listening on
const port = 8000;

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
        birthdate: 30,
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