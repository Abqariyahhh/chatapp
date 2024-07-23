const socket = io();
let user = 'user1'; // Set initial user

// Function to send a message
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message) {
        const msg = {
            text: message,
            user: user
        };
        socket.emit('chat message', msg);
        input.value = '';
    }
}

// Event listener for send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Event listener for Enter key
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Handle incoming messages
socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});