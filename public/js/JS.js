//Loader
var timeOut;
function myFunction() {
    timeOut = setTimeout(showPage, 3000);
}

    const chatElements = document.querySelectorAll('.nav-bar-chats');

    function clearSelection() {
        chatElements.forEach(chat => {
            chat.classList.remove('selected');
        });
    }

    chatElements.forEach(chat => {
        chat.addEventListener('click', () => {
            clearSelection();
            chat.classList.add('selected');
        });
    });

//Autoscroll aqui ta marlaaaaa :D
const chatContainer = document.querySelector('.nav-bar-chat-container');

// Función para hacer scroll al final del contenedor
function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Llama a la función cuando la página se carga completamente
window.addEventListener('load', scrollToBottom);

// Si añades mensajes dinámicamente, llama a la función en ese momento también



function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "flex";
  document.getElementById("myFoot").style.display = "flex";
}

//-----------------------------------Funciones para desplazarse entre las vistas
function toSignIn() {
  window.location.href = 'signin.html';
}

function toLogIn(){
  window.location.href = 'login.html';
}

function toIndex(){
  window.location.href = 'index.html';
}

function toUserfiles(){
    window.location.href = 'index.html';
  }
