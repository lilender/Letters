const db = require('../db');

const UsuarioModel = {
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    },
    createUser: (username, hashedPassword, callback) => {
        const query = "CALL sp_update_usuarios('agregar','?','?');";
        db.query(query, [username, hashedPassword], callback);
    },
};

module.exports = UsuarioModel;
