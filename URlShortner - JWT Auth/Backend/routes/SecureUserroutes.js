const express = require('express');
const { VerifyCookie } = require('../middlewares/UserAuth');

const SecureUserroutes = express.Router();

SecureUserroutes.get('/secure/user', VerifyCookie, (req, res) => {
    const user = req.user;
    
    if (user) {
        res.status(202).json({
            message: "User is authenticated",
            user: user 
        });
    } else {
        res.status(401).json({
            error: "User not authenticated"
        });
    }
});

module.exports = { SecureUserroutes };
