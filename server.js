const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // For password hashing
const bodyParser = require('body-parser'); // For handling POST requests

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'letters'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Handle registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hash], (err, result) => {
            if (err) {
                res.status(500).send('User registration failed');
            } else {
                res.status(200).send('User registered');
            }
        });
    });
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) throw err;
                if (match) {
                    res.status(200).send('Login successful');
                } else {
                    res.status(400).send('Invalid credentials');
                }
            });
        } else {
            res.status(400).send('User not found');
        }
    });
});

// Handle fetching all messages
app.get('/messages', (req, res) => {
    const query = `
        SELECT users.username, messages.message, messages.created_at
        FROM messages
        JOIN users ON messages.user_id = users.id
        ORDER BY messages.created_at ASC
    `;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving messages');
        } else {
            res.json(results);
        }
    });
});


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chatMessage', (user, msg) => {
        // Save message to database
        const query = 'INSERT INTO messages (user_id, message) VALUES ((SELECT id FROM users WHERE username = ?), ?)';
        db.query(query, [user, msg], (err, result) => {
            if (err) throw err;
            io.emit('chatMessage', user, msg);
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
