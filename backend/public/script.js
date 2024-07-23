const socket = io();

let currentUser = ''; // Will be set to 'user1' or 'user2'

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const determineUser = () => {
    socket.emit('check user'); // Notify server to determine current user
};

sendButton.addEventListener('click', () => {
    sendMessage();
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

const sendMessage = () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', { text: message, user: currentUser });
        messageInput.value = ''; // Clear input field
    }
};

socket.on('chat message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom

    // Adjust zoom on mobile
    if (window.innerWidth <= 600) {
        document.body.style.zoom = 0.9; // Adjust as needed
    }
});

socket.on('set user', (user) => {
    currentUser = user;
});

determineUser();