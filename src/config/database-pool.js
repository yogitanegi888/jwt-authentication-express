const mysql = require('mysql');

module.exports = mysql.createPool({
    host: 'localhost',
    user: 'sachinsingh',
    password: 'root123',
    port: 3306,
    database: 'restapi',
    connectionLimit: 20
});
