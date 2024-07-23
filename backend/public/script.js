const socket = io();
let user = null; // User will be set once both users have joined

// Send message on "Enter" key press or "Send" button click
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();

    if (messageText && user) {
        const msg = {
            text: messageText,
            user: user
        };
        socket.emit('chat message', msg);
        messageInput.value = ''; // Clear the input field
    }
}

// Handle connection and determine user role
socket.on('connect', () => {
    // Request the server to assign the user
    socket.emit('request user');
});

socket.on('user role', (role) => {
    user = role;
    console.log(`You are ${user}`);
});

// Update chat box with incoming messages
socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});

// Zoom out on mobile to ensure the keyboard does not overlap the message area
window.addEventListener('resize', () => {
    if (window.innerHeight < 500) {
        document.body.style.zoom = "90%";
    } else {
        document.body.style.zoom = "100%";
    }
});