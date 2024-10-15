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
            
            result = JSON.parse(JSON.stringify(result));
            if (result[0][0].mensaje === 'Error') {
                console.log('User not found');
                return res.redirect('/login');
            }

            req.session.user = {
                ID_usuario: result[0][0].ID_usuario,
                correo: result[0][0].correo,
                nombres: result[0][0].nombres,
                apellido_paterno: result[0][0].apellido_paterno,
                apellido_materno: result[0][0].apellido_materno,
                f_nacimiento: result[0][0].f_nacimiento,
                f_registro: result[0][0].f_registro,
                ID_carrera: result[0][0].ID_carrera,
                XP: result[0][0].XP,
                racha: result[0][0].racha
            };
            
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
    },
    logout: (req, res) => {
        UsuarioModel.logout(req.session.user.ID_usuario, (err, result) => {
            if (err) {
                console.log('err', err);
            }
            req.session.destroy();
            res.redirect('/login');
        });
    },
    getAllUsers: (req, res) => {
        UsuarioModel.getAllUsers((err, result) => {
            if (err) {
                console.log('err', err);
            }
            res.json(result);
        }
        );
    },
    getActiveUsers: (req, res) => {
        UsuarioModel.getActiveUsers((err, result) => {
            if (err) {
                console.log('err', err);
            }
            res.json(result);
        });
    }
};

module.exports = UserController;
