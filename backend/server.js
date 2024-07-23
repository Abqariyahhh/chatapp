const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let userCount = 0;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route handler
app.get('/', (req, res) => {
    res.send('Welcome to the chat app!');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    userCount++;

    // Assign user role
    const userRole = userCount === 1 ? 'user1' : 'user2';
    socket.emit('user role', userRole);

    // Broadcast chat message
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
        userCount--;
    });

    // Request user role
    socket.on('request user', () => {
        const userRole = userCount === 1 ? 'user1' : 'user2';
        socket.emit('user role', userRole);
    });
});

// Use environment variable for port or default to 3002
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});