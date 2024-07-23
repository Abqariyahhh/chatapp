const socket = io();
let currentUser = 'user1'; // Initial user
let user2Joined = false; // To check if user 2 has joined

// Send message when the button is clicked or Enter is pressed
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    
    if (messageText) {
        const msg = {
            text: messageText,
            user: currentUser
        };
        socket.emit('chat message', msg);
        messageInput.value = '';
    }
}

// Handle Enter key to send message
document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent newline in input field
        sendMessage();
    }
});

// Handle Send button click to send message
document.getElementById('send-button').addEventListener('click', sendMessage);

// Scroll to the latest message when new messages are added
socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});

// Update current user based on socket connection
socket.on('connect', function() {
    if (!user2Joined) {
        currentUser = 'user2'; // Set to user2 if no other user is joined
        user2Joined = true;
    }
});