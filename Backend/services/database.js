// db.js
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite'); 

let dbInstance; 

async function initDb() {
    dbInstance = await sqlite.open({
        filename: "./FastingDatabase",
        driver: sqlite3.Database
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
                birthdate DATE NOT NULL,
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

async function addUsers(user) { 
    let { auth_id, user_name, birthdate, initial_weight, goal_weight, height, gender, activity_level } = user;

    try {
        // Check if the user already exists
        let checkSql = `SELECT * FROM users WHERE auth_id = ?`;
        let checkParams = [auth_id];
        let existingUser = await dbInstance.get(checkSql, checkParams);
        
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Insert the user if they don't exist
        let userSql = `INSERT INTO users (auth_id, user_name, birthdate, initial_weight, goal_weight, height, gender, activity_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        let userInput = [auth_id, user_name, birthdate, initial_weight, goal_weight, height, gender, activity_level];
        let operation = await dbInstance.run(userSql, userInput);
        
        return { success: true, operation };
    } catch(error) {
        console.error('Failed to insert row into user table', error);
        return { success: false, error: error.message };
    }
}

async function addUserRecipe(userRecipe) {
    let { auth_id, recipe_name, recipe } = userRecipe; 

    try {
        // Check if the recipe already exists
        let checkSql = `SELECT * FROM user_recipes WHERE auth_id = ? AND recipe_name = ?`;
        let checkParams = [auth_id, recipe_name];
        let existingRecipe = await dbInstance.get(checkSql, checkParams);

        if (existingRecipe) {
            throw new Error('Recipe already exists');
        }

        // Insert the recipe if it doesn't exist
        let recipeSql = `INSERT INTO user_recipes (auth_id, recipe_name, recipe) VALUES (?, ?, ?)`;
        let userInput = [auth_id, recipe_name, recipe];
        await dbInstance.run(recipeSql, userInput);

        console.log('Added row into the user recipe database');
        return { success: true };
    } catch(error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}

async function listUser() {
    let sqlQuery = `SELECT * FROM users`; // Corrected table name
    
    try {
        const userRows = await dbInstance.all(sqlQuery);
        return userRows;
    } catch(error) {
        console.log(error);
    }
}

async function listRecipe() {
    let sqlQuery = `SELECT * FROM user_recipes`;

    try {
        let recipeRow = await dbInstance.all(sqlQuery);
        return recipeRow;
    } catch(error) {
        console.log(error);
    }
}

async function getTables() {
    let db = await initDb();

    try {
        let sql = `SELECT name FROM sqlite_master WHERE type = 'table'`;
        let operation = await db.all(sql);
        return operation;
    } catch(error) {
        console.log(error);
    }
}

async function closeDb() {
    if (dbInstance) {
        await dbInstance.close();
        console.log('Database connection closed');
    }
}

module.exports = {
    initDb,
    createTables,
    addUsers,
    addUserRecipe,
    listUser,
    listRecipe,
    getTables,
    closeDb
}