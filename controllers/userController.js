const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/UsuarioModel');

const UserController = {
    login: (req, res) => {
        UsuarioModel.login(req.body['email'], req.body['password'], (err, result) => {
            console.log('result', result);
            if (err) {
                console.log('Database error:', err);
                return res.redirect('/login');
            }
        
            const user = result[0][0];
        
            if (!user) {
                console.log('User not found or password incorrect');
                return res.redirect('/login');
            }
        
            console.log('User authenticated:', user);
            req.session.user = user;
            res.redirect('/main');
        }
        );
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
