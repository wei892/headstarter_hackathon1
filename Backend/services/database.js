const sqlite3 = require('sqlite3');
const sqlite = require('sqlite'); 

// Connection to database 
let db; 
async function initDB() {
    db = await sqlite.open({
        filename : "FastingDatabase",
        driver : sqlite3.Database
    })
}

