const socket = io();

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.text())
    .then(data => alert(data));
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            document.querySelector('.chat-container').style.display = 'block';
            document.getElementById('auth-container').style.display = 'none';
            loadMessages(); // Load messages after login
        } else {
            response.text().then(data => alert(data));
        }
    });
});

function loadMessages() {
    fetch('/messages')
    .then(response => response.json())
    .then(messages => {
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = ''; // Clear chat box
        messages.forEach(message => {
            const msgDiv = document.createElement('div');
            msgDiv.textContent = `${message.username}: ${message.message}`;
            chatBox.appendChild(msgDiv);
        });
    });
}

document.getElementById('send-btn').addEventListener('click', () => {
    const message = document.getElementById('chat-input').value;
    const user = document.getElementById('login-username').value;
    socket.emit('chatMessage', user, message);
    document.getElementById('chat-input').value = '';
});

socket.on('chatMessage', (user, msg) => {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${user}: ${msg}`;
    chatBox.appendChild(msgDiv);
});
