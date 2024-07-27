const sqlite3 = require('sqlite3');
const sqlite = require('sqlite'); 
const fs = require('fs')

// Listing all of the tables 
async function getTables() {
    let db = await initDb();

    try {
        let sql = `SELECT name FROM sqlite_master WHERE type = 'table'`;
        let operation = db.all(sql);
        return operation
    } catch(error) {
        console.log(error);
    }
}

// Connection to database 
let dbInstance; 
async function initDb() {
    dbInstance = await sqlite.open({
        filename: "./FastingDatabase",
        driver : sqlite3.Database
    });

    return dbInstance;
}

async function createTables() {
    const db = await initDb();

    try {
        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                auth_id TEXT NOT NULL PRIMARY KEY,
                user_name TEXT NOT NULL,
                age INTEGER NOT NULL,
                initial_weight INTEGER NOT NULL,
                goal_weight INTEGER NOT NULL,
                height INTEGER NOT NULL,
                gender TEXT NOT NULL,
                activity_level TEXT NOT NULL
            );
        `;

        const createUserRecipesTable = `
            CREATE TABLE IF NOT EXISTS user_recipes (
                auth_id TEXT,
                recipe_name TEXT NOT NULL, 
                recipe TEXT NOT NULL,    
                FOREIGN KEY (auth_id) REFERENCES users(auth_id), 
                PRIMARY KEY (auth_id, recipe_name)
            );
        `;

        await db.exec(createUsersTable);
        await db.exec(createUserRecipesTable);

        console.log('Tables created successfully');
    } catch (error) {
        console.log('Error creating the tables', error);
    }
}

// Function to reset the tables in the databse 
async function deleteTables() {
    try {
        // Deleting the rows for each table 
        await dbInstance.run(`DELETE FROM users`);
        await dbInstance.run(`DELETE FROM user_recipes`);
    } catch(error) {
        console.log(error);
    }
}

// Function for adding a user to the user table 
async function addUsers(user) { 
    // Parse json object
    let { auth_id, initial_weight, goal_weight, height, gender, activity_level } = user;

    try {
        // Sql query to add a row into the user database
        let userSql = `INSERT INTO users (auth_id, initial_weight, goal_weight, height, gender, activity_level) VALUES (?, ?, ? ,? ,? ,?)`;

        // Parsed information from json to enter into each column
        let userInput = [auth_id, initial_weight, goal_weight, height, gender, activity_level];

        // Performing the operation
        let addOperation = await dbInstance.run(userSql, userInput);
        
        console.log('Added row into user database');
    } catch(error) {
        console.log('Failed to insert row into user table', error);
    }
}

// Function for adding a user to the recipe table 
async function addUserRecipe(userRecipe) {
    // Sql query to add a row into the user database
    let { auth_id, recipe_name, recipe } = userRecipe; 

    try {
        // Sql operation
        let recipeSql = `INSERT INTO user_recipes (auth_id, recipe_name, recipe) VALUES (?, ?, ?)`;

        // Parsed information from json to enter into each column
        let userInput = [auth_id, recipe_name, recipe];

        // Adding row into the table
        let recipeOperation = await dbInstance.run(recipeSql, userInput);

        console.log('Added row into the user recipe database');
    } catch(error) {
        console.log(error);
    }
}

// Function to display all of the rows in the tables 

// User table
async function listUser() {
    let sqlQuery = `SELECT * FROM user`; 
    
    try {
        const userRows = await dbInstance.all(sqlQuery);
        return userRows;
    } catch(error) {
        console.log(error);
    }
}

// User recipe table
async function listRecipe() {
    let sqlQuery = `SELECT * FROM user_recipes`

    try {
        let recipeRow = dbInstance.all(sqlQuery);
        return recipeRow;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    initDb,
    createTables,
    deleteTables,
    addUsers,
    addUserRecipe,
    listUser,
    listRecipe,
    getTables
}

