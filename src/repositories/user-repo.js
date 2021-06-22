const pool = require('../config/database-pool');
const { CREATE_NEW_USER } = require('../utils/sql-quries');

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
                    let values = [user.firstName, user.lastName, user.dateOfBirth, user.username, user.password];
                    connection.query(CREATE_NEW_USER,values, (err, result) => {
                        if (err)
                            reject(err);
                        else
                            console.log(result);
                            resolve(result);
                    });
                }
            });
        });
    }


}

const userRepository = new UserRepository(pool);

module.exports = userRepository;