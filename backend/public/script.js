const socket = io();
let user = 'user1'; // Initial user

// Handle sending message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText) {
        const msg = {
            text: messageText,
            user: user
        };
        socket.emit('chat message', msg);
        messageInput.value = '';
        messageInput.focus(); // Keep focus on the input after sending
    }
}

// Handle Enter key press for sending message
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

// Handle Send button click
document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
});

// Handle incoming messages
socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});

// Set user after second person joins
socket.on('connect', () => {
    socket.on('user joined', (joinedUser) => {
        user = joinedUser;
    });
});