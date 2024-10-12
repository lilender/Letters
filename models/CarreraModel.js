const db = require('../db');

const CarreraModel = {
    get: (callback) => {
        const query = 'SELECT * FROM carrera';
        db.query(query, callback);
    },
};

module.exports = CarreraModel;