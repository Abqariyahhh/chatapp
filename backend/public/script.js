const socket = io();
let user = 'user1'; // Initial user
let user1Assigned = false; // Flag to check if user1 is assigned

// Handle message sending
document.getElementById('send-button').addEventListener('click', () => {
    sendMessage();
});

// Handle 'Enter' key to send message
document.getElementById('message-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default Enter key behavior
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText === '') return; // Do not send empty messages

    const msg = {
        text: messageText,
        user: user
    };
    socket.emit('chat message', msg);

    // Clear the input field
    messageInput.value = '';
}

// Receive and display messages
socket.on('chat message', function (msg) {
    if (!msg.user || !msg.text) return; // Ensure message and user are valid

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;

    // Append the message element to the chat box
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;

    // Switch user after sending a message
    user = (user === 'user1') ? 'user2' : 'user1'; // Ensure proper assignment of user
});