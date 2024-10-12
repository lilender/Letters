const db = require('./db'); // Separate module for DB connection

const UserModel = {
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    },
    createUser: (username, hashedPassword, callback) => {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], callback);
    },
};

module.exports = UserModel;
