const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/UsuarioModel');

const UserController = {
    login: (req, res) => {
        const { username, password } = req.body;
        UsuarioModel.findByUsername(username, (err, results) => {
            // Authentication logic here
        });
    },
    register: (req, res) => {
        console.log('req.body', req.body);
        
        /*const { username, password } = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
            UsuarioModel.createUser(username, hash, (err, result) => {
                res.redirect('/login');
            });
        });*/
        console.log('register');
    }
};

module.exports = UserController;
