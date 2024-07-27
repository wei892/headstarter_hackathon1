const db = require('../services/database');

async function createUsers(req,res,next) {
    let userInfo = req.body;
    let operation = await db.addUsers(userInfo);

    if(operation == null) {
        req.myError = ("Failed to insert the user");
        next();
    } else { 
        next();
    }
}

module.exports = {
    createUsers
}