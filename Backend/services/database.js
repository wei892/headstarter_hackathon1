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

module.exports = {
    initDb,
    createTables
}

