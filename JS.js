//Loader
var timeOut;
function myFunction() {
    timeOut = setTimeout(showPage, 3000);
}

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