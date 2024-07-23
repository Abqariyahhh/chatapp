const socket = io();
let user = null; // User will be assigned when they connect

// Assign user on connection
socket.on('connect', () => {
    user = socket.id;
});

// Send a message
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message) {
        socket.emit('chat message', { text: message, user });
        input.value = '';
    }
}

// Send message on button click
document.getElementById('send-button').addEventListener('click', sendMessage);

// Send message on Enter key press
document.getElementById('message-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Display received messages
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(msg.user === user ? 'user1' : 'user2');
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});