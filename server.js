const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const bcrypt = require('bcrypt'); // For password hashing
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('routes');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/user', userRoutes);  // Routes for user-related actions like login/register

// Serve login and chat pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

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
