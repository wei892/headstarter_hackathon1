const sqlite3 = require('sqlite3');
const sqlite = require('sqlite'); 
const fs = require('fs')

// Connection to database 
let dbInstance; 
async function initDb() {
    dbInstance = await sqlite.open({
        filename: "FastingDatabase",
        driver : sqlite3.Database
    });

    return dbInstance;
}

// Creating the tables for the database
async function createTables() {
    const db = await initDb();

    try {
        const tables = ['users', 'user_recipes'];
        for(let table of tables) {
            let schema = fs.readFileSync(`${table}.sql`, `utf8`);
            await db.exec(schema);
        }

        console.log('Tables created successfully');
    }
    catch(error) {
        console.log('Error creating the tables');
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

async function addUsers(user) { 
    // Parse json object
    let { auth_id, initial_weight, goal_weight,
                height, gender, activity_level } = users;

    try {
        // Sql query to add a row into the user database
        let userSql = `INSERT INTO users (auth_id, initial_weight, goal_weight, height, gender, activity_level) VALUES (?, ?, ? ,? ,? ,?)`;

        // Parsed information from json to enter into each column
        let userInput = [auth_id, initial_weight, goal_weight, height, gender, activity_level];

        // Performing the operation
        let addOperation = dbInstance.run(userSql, userInput);
        
        console.log('Added row into user database');
    } catch(error) {
        console.log('Failed to insertg row into user table', error);
    }
}

async function addUserRecipe(userRecipe) {
    // Sql query to add a row into the user database
    let { auth_id, recipe_name, recipe } = userRecipe; 

    try {
        // Sql operation
        let recipeSql = `INSERT INTO user_recipe (auth_id, recipe_name, recipe) VALUES (?, ?, ?)`;

        // Parsed information from json to enter into each column
        let userInput = [auth_id, recipe_name, recipe];

        // Adding row into the table
        let recipeOperation = await dbInstance.run(recipeSql, userInput);

        console.log('Added row into the user recipe database');
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    initDb,
    createTables,
    deleteTables
}

