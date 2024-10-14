const { get } = require("../../models/CarreraModel");

$(document).ready(() => {
    const socket = io();

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
            );
            getDMs();
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = '/login';  // Redirect to login if not authenticated
        });

        function getDMs() {
            fetch('/DMs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID_usuario: usuario.ID_usuario }) // Sending user ID in the body
            })
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
                console.log('Fetched data:', data); // Log the data here
                if (!data.success || !data.chats.length) {
                    console.log('No chats found or data is not an array');
                    return;
                }
                const chatContainer = $('#chat-container');
                chatContainer.html(''); // Clear chat container
                data.chats.forEach(chat => {
                    let nombre;
                    let estatus;
                    if(chat.ID_usuario_a == usuario.ID_usuario){
                        nombre = chat.usuario_b_nombres + ' ' + chat.usuario_b_apellido_paterno + ' ' + chat.usuario_b_apellido_materno;
                        estatus = chat.usuario_b_estatus;                        
                    } else {
                        nombre = chat.usuario_a_nombres + ' ' + chat.usuario_a_apellido_paterno + ' ' + chat.usuario_a_apellido_materno;
                        estatus = chat.usuario_a_estatus;
                    }

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
                    chatTitle.textContent = nombre;
                    const chatMessage = document.createElement('p');
                    chatMessage.textContent = "`${chat.username}: ${chat.message}`";
                    chatInfo.appendChild(chatTitle);
                    chatInfo.appendChild(chatMessage);

                    chatBox.appendChild(chatInfo);
                    chatContainer.append(chatBox);

                    chatBox.addEventListener('click', () => {
                        $("#chat_id").val(chat.ID_chat);
                        $("#current_chat_name").text(nombre);
                        $("#current_chat_status").text(estatus);
                    });
                    
                });
            })
            .catch(error => console.error('Error fetching chats:', error));
        }

        setInterval(getDMs, 10000);

        const inputMessage = $("#input_message");
        const sendBtn = $("#send_btn");

        sendBtn.on('click', () => {
            event.preventDefault();

            const message = inputMessage.val();
            const chatID = $("#chat_id").val();
            if (message && chatID) {
                socket.emit('privateMessage', { chatID, message, sender: usuario.ID_usuario });
                inputMessage.val('');
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

        socket.on('privateMessage', (data) => {
            const { message, sender } = data;
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

        $('#nuevo_chat').on('click', () => {
            fetch('/allusers')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();  // Parse JSON data
                })
                .then(data => {
                    const users = data.map(user => ({
                        id: user.ID_usuario,
                        name: user.nombres + ' ' + user.apellido_paterno + ' ' + user.apellido_materno
                    }));
        
                    Swal.fire({
                        title: 'Search for a user',
                        html: `
                            <input type="text" id="searchUser" placeholder="Type a name">
                            <ul id="userList"></ul>
                        `,
                        didOpen: () => {
                            const searchUser = document.getElementById('searchUser');
                            const userList = document.getElementById('userList');
        
                            searchUser.addEventListener('input', () => {
                                userList.innerHTML = '';
        
                                const searchTerm = searchUser.value.toLowerCase();
                                const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));
        
                                filteredUsers.forEach(user => {
                                    const listItem = document.createElement('li');
                                    listItem.textContent = user.name;
                                    listItem.setAttribute('data-id', user.id);
                                    listItem.style.color = 'blue';
                                    userList.appendChild(listItem);
        
                                    listItem.addEventListener('click', () => {
                                        Swal.close();
                                        console.log('Selected user ID:', user.id);
                                        fetch('/newchat', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                ID_usuario: usuario.ID_usuario,
                                                ID_usuario2: user.id
                                            }),
                                        })
                                        .then(response => response.json())
                                        .then(result => {
                                            if (result.success) {
                                                console.log('Chat created successfully');
                                                getDMs();
                                            } else {
                                                console.error('Error creating chat:', result.message);
                                            }
                                        })
                                        .catch(error => console.error('Error:', error));
                                        
                                    });
                                });
                            });
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
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