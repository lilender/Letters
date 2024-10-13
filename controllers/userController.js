const bcrypt = require('bcrypt');
const UsuarioModel = require('../models/UsuarioModel');

const UserController = {
    login: (req, res) => {
        UsuarioModel.login(req.body['email'], req.body['password'], (err, result) => {
            console.log('result', result);
            console.log('err', err);
            if (err) {
                console.log('err', err);
                return res.redirect('/login');
            }
            if (result.length === 0) {
                console.log('User not found');
                return res.redirect('/login');
            }
            //const user = result[0];
            //req.session.user = user;
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
