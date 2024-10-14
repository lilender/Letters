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
const chatController = require('./controllers/chatController');

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
app.get('/DMs', (req, res) => {
    chatController.getDMs(req, res);
});
app.get('/allusers', (req, res) => {
    userController.getAllUsers(req, res);
});
app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/newchat', chatController.newDM);


const users = {};

io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('register', (user_id) => {
        users[user_id] = socket.id;
        console.log(`${user_id} registered with socket ID ${socket.id}`);
    });

    socket.on('privateMessage', (data) => {
        const { chatID, message, sender } = data;
        //fectch user ID from chatID
        chatController.getUsersFromChat(chatID, (err, result) => {
            if (err) {
                console.log('Error fetching users:', err);
                return;
            }
            const recipient = result[0].ID_usuario_a === sender ? result[0].ID_usuario_b : result[0].ID_usuario_a;
            const recipientSocketId = users[recipient];

            if (recipientSocketId) {
                io.to(recipientSocketId).emit('privateMessage', { message, sender });
            } else {
                console.log(`${recipient} is not connected.`);
            }
        });

        const recipientSocketId = users[recipient];

        if (recipientSocketId) {
            io.to(recipientSocketId).emit('privateMessage', { message, sender });
        } else {
            console.log(`${recipient} is not connected.`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        for (let user_id in users) {
            if (users[user_id] === socket.id) {
                delete users[user_id];
                break;
            }
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
