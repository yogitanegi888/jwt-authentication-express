module.exports.CREATE_NEW_USER = `INSERT INTO users (first_name, last_name, date_of_birth, username, password) VALUES (?, ?, ?, ?, ?)`;
module.exports.AUTHENTICATE_USER = `SELECT * FROM users WHERE username = ?`;