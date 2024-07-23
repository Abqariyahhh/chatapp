const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = []; // To keep track of users

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Welcome to the chat app!');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Assign user
    let assignedUser = users.length === 0 ? 'user1' : 'user2';
    users.push(assignedUser);
    socket.emit('assign user', assignedUser);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        users = users.filter(user => user !== assignedUser); // Clean up user list
    });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});