const express = require('express');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const app = express();
const { auth } = require('express-openid-connect');

// Port server is listening on
const port = 8000;

// Running the server
app.listen(port, () => {
    console.log("Listening from port", port);
});

app.get('/chicken', (req, res) => {
    // Create a chicken JSON object
    const chicken = {
        type: 'Chicken',
        breed: 'Rhode Island Red',
        age: 2
    };

    // Send the chicken JSON object as a response
    res.json(chicken);
});


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: 'http://localhost:8000',
    clientID: 'wgGmqPBgOYOecpxLro9lzXlHvNCO0sDN',
    issuerBaseURL: 'https://dev-3selmw8fy6fyr2gt.us.auth0.com'
};


app.use(auth(config));


app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


