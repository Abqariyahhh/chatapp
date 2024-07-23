const socket = io();
let user = 'user1'; // Default user
let user1Joined = false;
let user2Joined = false;

document.getElementById('send-button').addEventListener('click', () => {
    sendMessage();
});

document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const input = document.getElementById('message-input');
    const messageText = input.value.trim();

    if (messageText) {
        const msg = {
            text: messageText,
            user: user
        };
        socket.emit('chat message', msg);
        input.value = '';
        input.focus();
    }
}

// When the chat app starts, the first user is user1
socket.on('connect', () => {
    if (!user1Joined) {
        user1Joined = true;
        user = 'user1';
        socket.emit('user joined', 'user1');
    } else if (!user2Joined) {
        user2Joined = true;
        user = 'user2';
        socket.emit('user joined', 'user2');
    }
});

socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});

// Handle the event when a new user joins
socket.on('user joined', (newUser) => {
    if (newUser === 'user2') {
        user = 'user2';
    }
});