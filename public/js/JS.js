//Loader
var timeOut;
function myFunction() {
    timeOut = setTimeout(showPage, 3000);
}

// Selecciona todos los elementos con la clase 'nav-bar-chats'
    const chatElements = document.querySelectorAll('.nav-bar-chats');

    // Función para quitar la clase 'selected' de todos los chats
    function clearSelection() {
        chatElements.forEach(chat => {
            chat.classList.remove('selected');
        });
    }

    // Agrega un evento de clic a cada chat
    chatElements.forEach(chat => {
        chat.addEventListener('click', () => {
            // Limpia la selección previa
            clearSelection();
            // Agrega la clase 'selected' al chat clickeado
            chat.classList.add('selected');
        });
    });




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
