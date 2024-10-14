const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session'); // Session management





// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: 'no-entiendo-nada-de-esto-banana-perro-calceta-orangutan-terremoto-calculointegral',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set secure: true if using HTTPS
}));

const userController = require('./controllers/userController');
const carreraController = require('./controllers/carreraController');
const UsuarioModel = require('./models/UsuarioModel');

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
app.get('/main', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'main.html'));
    } else {
        res.redirect('/login');
    }
});
app.get('/session', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: 'Not logged in' });
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});
app.get('/careers', (req, res) => {
    carreraController.get(req, res);
});
app.get('/chats', (req, res) => {
    userController.getActiveUsers(req, res);
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
