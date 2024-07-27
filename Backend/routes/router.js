const express = require('express'); 
const userController = require('../controllers/createUsers');
const router = express.Router();

// Endpoint for login page
router.get('/login', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Endpoint to add user information into database
router.post('/create-user', userController.createUsers, (req,res) => {
    if(req.myError) {
        res.status(400).json({
            message : req.myError
        });
    } else {
        res.status(200).json({
            message : 'Created user'
        })
    }
});

module.exports = router;