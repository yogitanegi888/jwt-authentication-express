const express = require('express');
const router = express.Router();
const userRepo = require('../repositories/user-repo');
const jwtUtil = require('../utils/jwt-token-utils');
const bcrypt = require('bcryptjs');
router.post('/register', (req, res) => {
    let user = req.body;
    userRepo.createNewUser(user).then(result => {
        res.end();
    }).catch(error => {
        res.status(500).end();
    });
});

router.post('/login', (req, res) => {
    const credentials = req.body;
    userRepo.authenticateUser(credentials).then(result => {
        if (result.length == 0) {
            res.json({
                authStatus: false,
                message: 'User Not Found'
            });    
        } else if (bcrypt.compareSync(credentials.password, result[0].password)) {
            delete result[0].password;
            const token = jwtUtil.createTokenForUser(result[0]);
            res.json({
                authStatus: true,
                message: 'User Successfully Authenticated',
                token: token
            });
        } else {
            res.json({
                authStatus: false,
                message: 'Invalid Username or Password'
            });
        }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    })
});

module.exports = router;