const socket = io();

$(document).ready(() => {
    fetch('/session')
        .then(response => {
            if (!response.ok) {
                throw new Error('User not logged in');
            }
            return response.json();
        })
        .then(data => {
            console.log('Logged in as:', data.user.correo);
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = '/login';  // Redirect to login if not authenticated
        });


        fetch('/chats')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {

            /*<div class="row nav-bar-chats d-flex align-items-center p-1">
                <div class="col-2">
                    <span class="profile-image">
                        <img src="images/tomilloprofile.png" class="nav-profile-image">
                    </span>
                </div>
                <div class="col-10 d-flex align-items-start flex-column">
                    <h3>Los pollitos de A & R</h3>
                    <p>Edgar: joto</p>
                </div>
            </div>*/

            const chatContainer = $('#chat-container');
            data.forEach(chat => {
                const chatBox = document.createElement('div');
                chatBox.classList.add('row', 'nav-bar-chats', 'd-flex', 'align-items-center', 'p-1');

                const imageSpace = document.createElement('div');
                imageSpace.classList.add('col-2');
                const imageBox = document.createElement('span');
                imageBox.classList.add('profile-image');
                const img = document.createElement('img');
                img.src = 'images/tomilloprofile.png';
                img.classList.add('nav-profile-image');
                imageBox.appendChild(img);
                imageSpace.appendChild(imageBox);
                chatBox.appendChild(imageSpace);

                const chatInfo = document.createElement('div');
                chatInfo.classList.add('col-10', 'd-flex', 'align-items-start', 'flex-column');
                const chatTitle = document.createElement('h3');
                chatTitle.textContent = chat.nombres + ' ' + chat.apellido_paterno + ' ' + chat.apellido_materno;
                const chatMessage = document.createElement('p');
                chatMessage.textContent = "`${chat.username}: ${chat.message}`";
                chatInfo.appendChild(chatTitle);
                chatInfo.appendChild(chatMessage);

                chatBox.appendChild(chatInfo);
                chatContainer.append(chatBox);
                
            });
        })
        .catch(error => console.error('Error fetching chats:', error));
});



/*document.getElementById('register-form').addEventListener('submit', (e) => {
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
*/