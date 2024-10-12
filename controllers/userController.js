const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const UserController = {
    login: (req, res) => {
        const { username, password } = req.body;
        UserModel.findByUsername(username, (err, results) => {
            // Authentication logic here
        });
    },
    register: (req, res) => {
        /*const { username, password } = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
            UserModel.createUser(username, hash, (err, result) => {
                res.redirect('/login');
            });
        });*/
        alert('register');
    }
};

module.exports = UserController;
