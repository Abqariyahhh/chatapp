const socket = io();
const input = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatBox = document.getElementById('chat-box');

sendButton.addEventListener('click', () => {
    const message = input.value;
    if (message.trim()) {
        const msg = {
            text: message,
            user: 'user1' // Set this to the current user or manage user logic
        };
        socket.emit('chat message', msg);
        input.value = ''; // Clear the input field
    }
});

socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
