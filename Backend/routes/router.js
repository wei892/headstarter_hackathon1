const express = require('express'); 
const router = express.Router();

// Endpoint for login page
router.get('/login', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;