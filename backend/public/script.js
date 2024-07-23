const socket = io();
let user = 'user1'; // Initial user

// Send message on button click or enter key press
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        const msg = {
            text: message,
            user: user
        };
        socket.emit('chat message', msg);
        messageInput.value = '';
        messageInput.focus();
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});

// Listen for new connections and assign user roles
socket.on('assign user', function(userId) {
    user = userId;
});