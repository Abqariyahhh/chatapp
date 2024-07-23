const socket = io();
let user = 'user1'; // Initial user

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

    if (messageText) {
        const msg = {
            text: messageText,
            user: user
        };
        socket.emit('chat message', msg);
        messageInput.value = ''; // Clear the input field
    }
}

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
