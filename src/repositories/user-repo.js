const pool = require('../config/database-pool');
const { CREATE_NEW_USER, AUTHENTICATE_USER } = require('../utils/sql-quries');
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor(pool) {
        this.pool = pool;
    }

    createNewUser(user) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err)
                    reject(err);
                else {
                    const password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
                    let values = [user.firstName, user.lastName, user.dateOfBirth, user.username, password];
                    connection.query(CREATE_NEW_USER,values, (err, result) => {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
                    });
                }
                // give this connection back to pool.
                connection.release();
            });
        });
    }

    authenticateUser(credentials) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                console.log(credentials);
                if (err)
                    reject(err);
                else {
                    conn.query(AUTHENTICATE_USER, [credentials.username], (err, result) => {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
                    });
                }
            });
        });
    }

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (err)
                    reject(err);
                else {
                    conn.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
                    });
                }
            })
        });
    }
}

const userRepository = new UserRepository(pool);

module.exports = userRepository;