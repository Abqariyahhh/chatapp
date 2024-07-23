const socket = io();
let user = 'user1'; // You can set the initial user or determine it based on some logic

// Example messages for simulation
const user1Messages = [
    "Hello, how are you?",
    "Did you receive my last message?",
    "Let's meet up tomorrow!"
];

const user2Messages = [
    "I'm good, thanks! How about you?",
    "Yes, I did. I'll be there!",
    "Great! See you then."
];

let user1Index = 0;
let user2Index = 0;

// Send predefined messages from users
function sendMessage() {
    let message;
    if (user === 'user1' && user1Index < user1Messages.length) {
        message = user1Messages[user1Index];
        user1Index++;
    } else if (user === 'user2' && user2Index < user2Messages.length) {
        message = user2Messages[user2Index];
        user2Index++;
    }

    if (message) {
        const msg = {
            text: message,
            user: user
        };
        socket.emit('chat message', msg);
        user = (user === 'user1') ? 'user2' : 'user1'; // Switch user after sending a message
    }
}

// Start sending messages after a delay
function startConversation() {
    setInterval(sendMessage, 3000); // Sends a message every 3 seconds
}

startConversation();

socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', msg.user);
    messageElement.textContent = msg.text;
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
});