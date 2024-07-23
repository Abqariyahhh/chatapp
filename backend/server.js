const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Emit messages received from clients to all clients
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Use environment variable for port or default to 3002
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});