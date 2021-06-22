const userRepo = require('../repositories/user-repo');

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    registerUser(user) {
        
    }

}

module.exports = new UserService(userRepo);