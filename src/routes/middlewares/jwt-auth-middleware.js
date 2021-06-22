
// Middleware function to authenticate user with JWT Token
module.exports = function(req, res, next) {
    console.log("jwt filter called");
    next();
}