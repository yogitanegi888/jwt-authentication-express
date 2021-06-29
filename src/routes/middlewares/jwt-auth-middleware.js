const userRepo = require('../../repositories/user-repo');
const jsonwebtoken = require('jsonwebtoken');
const jwtUtil = require('../../utils/jwt-token-utils');
// Middleware function to authenticate user with JWT Token
module.exports = function(req, res, next) {
    const authType = req.header('authorization');
    if (authType && authType.startsWith('Bearer ')) {
        const token = authType.substr(7);
        try {
            let user = jsonwebtoken.verify(token,jwtUtil.SECRETE);
            req.currentUser = user;
            console.log(user);
            next();
        } catch(err) {
            
            res.setHeader('WWW-Authenticate', 'Bearer');
            res.json({message: err.message});
            res.status(401).end();    
        }
    } 
    else {
        res.setHeader('WWW-Authenticate', 'Bearer');
        res.status(401).end();
    }
}