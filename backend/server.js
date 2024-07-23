const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let users = 0; // To track the number of users

io.on('connection', (socket) => {
    console.log('A user connected');
    users++;

    // Assign user based on number of users
    const userAssigned = users === 1 ? 'user1' : 'user2';
    socket.emit('set user', userAssigned);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        users--;
    });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});