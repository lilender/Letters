$(document).ready(() => {
    class Usuario {
        constructor(){
            this.ID_usuario = 0;
            this.correo = '';
            this.nombres = '';
            this.apellido_paterno = '';
            this.apellido_materno = '';
            this.f_nacimiento = '';
            this.f_registro = '';
            this.ID_carrera = 0;
            this.XP = 0;
            this.racha = 0;
        }
        make(ID_usuario, correo, nombres, apellido_paterno, apellido_materno, f_nacimiento, f_registro, ID_carrera, XP, racha){
            this.ID_usuario = ID_usuario;
            this.correo = correo;
            this.nombres = nombres;
            this.apellido_paterno = apellido_paterno;
            this.apellido_materno = apellido_materno;
            this.f_nacimiento = f_nacimiento;
            this.f_registro = f_registro;
            this.ID_carrera = ID_carrera;
            this.XP = XP;
            this.racha = racha;
        }
    }
    const usuario = new Usuario();
    fetch('/session')
        .then(response => {
            if (!response.ok) {
                throw new Error('User not logged in');
            }
            return response.json();
        })
        .then(data => {
            console.log('Logged in as:', data.user.correo);
            const socket = io();
            socket.emit('register', data.user.ID_usuario);
            usuario.make(
                data.user.ID_usuario,
                data.user.correo,
                data.user.nombres,
                data.user.apellido_paterno,
                data.user.apellido_materno,
                data.user.f_nacimiento,
                data.user.f_registro,
                data.user.ID_carrera,
                data.user.XP,
                data.user.racha
            )
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

                chatBox.addEventListener('click', () => {
                    $("chat_id").val(chat.ID_usuario);
                    $("#current_chat_name").text(chat.nombres + ' ' + chat.apellido_paterno + ' ' + chat.apellido_materno);
                    $("#current_chat_status").text(chat.estatus);
                });
                
            });
        })
        .catch(error => console.error('Error fetching chats:', error));


        const inputMessage = $("#input_message");
        const sendBtn = $("#send_btn");

        sendBtn.on('click', () => {
            const message = inputMessage.val();
            const recipient = $("#chat_id").val();
            if (message && recipient) {
                socket.emit('privateMessage', { recipient, message, sender: usuario.ID_usuario });
                inputMessage.val('');
                /**
                <div class="row d-flex flex-row-reverse">
                    <div class="col-7 d-flex justify-content-end p-2 pt-2 pb-1">
                        <div class="user-messages p-2">
                            <p>pregúntale a marla :p</p>
                        </div>
                    </div>
                </div>
                */
                const messageElement = document.createElement('div');
                messageElement.classList.add('row', 'd-flex', 'flex-row-reverse');
                const messageBox = document.createElement('div');
                messageBox.classList.add('col-7', 'd-flex', 'justify-content-end', 'p-2', 'pt-2', 'pb-1');
                const messageContent = document.createElement('div');
                messageContent.classList.add('user-messages', 'p-2');
                const messageText = document.createElement('p');
                messageText.textContent = message;
                messageContent.appendChild(messageText);
                messageBox.appendChild(messageContent);
                messageElement.appendChild(messageBox);

                $('#message-container').append(messageElement);
            }
        });

        // Receive private messages
        socket.on('privateMessage', (data) => {
            const { message, sender } = data;
            /*
            <div class="row">
                <div class="col-7 d-flex justify-content-start p-4 pt-2 pb-0">
                    <div class="messages p-2">
                        <p>... podemos vestir a tomillo como soldado?</p>
                    </div>
                </div>
            </div>
            */
            const messageElement = document.createElement('div');
            messageElement.classList.add('row');
            const messageBox = document.createElement('div');
            messageBox.classList.add('col-7', 'd-flex', 'justify-content-start', 'p-4', 'pt-2', 'pb-0');
            const messageContent = document.createElement('div');
            messageContent.classList.add('messages', 'p-2');
            const messageText = document.createElement('p');
            messageText.textContent = message;
            messageContent.appendChild(messageText);
            messageBox.appendChild(messageContent);
            messageElement.appendChild(messageBox);

            $('#message-container').append(messageElement);
        });
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