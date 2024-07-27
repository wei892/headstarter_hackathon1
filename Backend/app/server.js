const express = require('express');
const db = require('../services/database');

// App 
const app = express();

// Port server is listening on
const port = 8000;

// Running the server 
app.listen(port, async () => {
    await db.initDb();
    await db.createTables();
    console.log(await db.getTables());
    /*
    // Test adding a user
    const user = {
        auth_id: "user123",
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

    await listUser();
    await listRecipe();
    */
});