const db = require('../db');

const UsuarioModel = {
    login: (correo, contra, callback) => {
        const query = "CALL sp_update_usuarios('inicio',NULL,NULL,NULL,?,?,NULL,NULL,NULL,NULL,NULL);";
        db.query(query, [correo, contra], callback);
    },
    createUser: (nombres, apellido_paterno, apellido_materno, correo, contra, f_nacimiento, carrera, callback) => {
        const query = "CALL sp_update_usuarios('agregar',?,?,?,?,?,?,NULL,NULL,?,NULL);";
        db.query(query, [nombres, apellido_paterno, apellido_materno, correo, contra, f_nacimiento, carrera], callback);
    },
};

module.exports = UsuarioModel;
