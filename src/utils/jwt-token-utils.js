const jsonwebtoken = require('jsonwebtoken');

const SECRETE = 'sabka katega';

function createTokenForUser(user) {
    console.log();
    return jsonwebtoken.sign({user}, SECRETE,{
        algorithm: 'HS256',
        issuer: 'Sachin Singh',
        expiresIn: '7d',
        subject: user.username
    });
}

module.exports.createTokenForUser = createTokenForUser;
module.exports.SECRETE = SECRETE;