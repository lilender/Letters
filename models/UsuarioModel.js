const db = require('../db');

const UsuarioModel = {
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    },
    createUser: (nombres, apellido_paterno, apellido_materno, correo, contra, f_nacimiento, carrera, callback) => {
        const query = "CALL sp_update_usuarios('agregar','?','?','?','?','?','?', NULL, NULL,'?', NULL);";
        db.query(query, [nombres, apellido_paterno, apellido_materno, correo, contra, f_nacimiento, carrera], callback);
    },
};

module.exports = UsuarioModel;
