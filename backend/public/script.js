const socket = io();

// Track the users
let user = 'user1'; // Default to user1 initially

// Listen for the initial server message to set the user
socket.on('set user', (assignedUser) => {
    user = assignedUser;
    console.log(`You are now ${user}`);
});

// Send message to the server
function sendMessage() {
    const message = document.getElementById('message-input').value;
    if (message.trim() !== '') {
        const msg = {
            text: message,
            user: user
        };
        socket.emit('chat message', msg);
        document.getElementById('message-input').value = '';
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);

socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});