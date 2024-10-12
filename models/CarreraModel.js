const db = require('../db');

const CarreraModel = {
    get: (callback) => {
        const query = 'SELECT * FROM carreras';
        db.query(query, callback);
    },
};

module.exports = CarreraModel;