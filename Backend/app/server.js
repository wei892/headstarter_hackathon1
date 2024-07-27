const express = require('express');
const db = require('../services/database');

// App 
const app = express();

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
        age: 30,
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