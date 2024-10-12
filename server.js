const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userController = require('./controllers/userController');
const carreraController = require('./controllers/carreraController');

// Redirect the root URL to /login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Routes
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});
app.get('/careers', (req, res) => {
    carreraController.get(req, res);
});
app.post('/register', userController.register);
app.post('/login', userController.login);



// WebSocket for real-time chat
io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chatMessage', (user, msg) => {
        // Broadcast message to all users
        io.emit('chatMessage', user, msg);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
