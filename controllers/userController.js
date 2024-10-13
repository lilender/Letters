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
        UsuarioModel.createUser(
            req.body['name'], 
            req.body['lastname'], 
            req.body['secondlastname'], 
            req.body['email'], 
            req.body['password'][0], 
            req.body['datePicker'], 
            req.body['selectedCareerId'], (err, result) => {
                if (err) {
                    console.log('err', err);
                    return res.redirect('/signin');
                }
                res.redirect('/login');
            }
        );
    }
};

module.exports = UserController;
