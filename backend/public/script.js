const socket = io();
let currentUser = 'user1'; // Initial user

// Function to send a message
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        const msg = {
            text: message,
            user: currentUser
        };
        socket.emit('chat message', msg);
        input.value = ''; // Clear the input field
        currentUser = (currentUser === 'user1') ? 'user2' : 'user1'; // Toggle user for next message
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
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