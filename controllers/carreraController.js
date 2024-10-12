const CarreraModel = require('../models/CarreraModel');

const CarreraController = {
    get: (req, res) => {
        CarreraModel.get((err, results) => {
            if (err) {
                return res.status(500).send('Error retrieving careers');
            }
            res.json(results);
        });
    },
};

module.exports = CarreraController;
