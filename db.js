const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ungu3554bl3p455byt0m1ll0', //ungu3554bl3p455byt0m1ll0
    database: 'letters'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

module.exports = db;
