const socket = io();
let currentUser = 'user1'; // Initial user
let user = null; // User identifier

// Handle entering the chat
socket.on('connect', () => {
    // Request the server to assign a user
    socket.emit('request user');
});

// Handle receiving user assignment
socket.on('assign user', (assignedUser) => {
    user = assignedUser;
    currentUser = user;
    console.log(`Assigned user: ${user}`);
});

// Send message when enter key is pressed
document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Send message when send button is clicked
document.getElementById('send-button').addEventListener('click', sendMessage);

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message) {
        const msg = {
            text: message,
            user: user
        };
        socket.emit('chat message', msg);
        messageInput.value = ''; // Clear the input field
        messageInput.focus(); // Refocus the input field
    }
}

// Display messages in the chat box
socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});