const { createTables } = require('./database');

async function databaseEntry() { 
    try { 
        await createTables();
    } catch(error) {
        console.log(error);
    }
}

databaseEntry();