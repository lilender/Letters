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

    function showUserDetails() {
      // Selecciona el contenedor donde está el contenido actual
      var contentContainer = document.getElementById('content-container');
      
      // Define el nuevo contenido que deseas mostrar
      var newContent = `
              <div class="profile-full-info d-flex flex-column align-items-left mt-0">
                  <a href="javascript:void(0)" class="align-self-start p-2" onclick="goBack()">
                      <img src="images/return.png" alt="">
                      Volver
                  </a>
                  <div class="d-flex flex-row p-1">
                      <div class="col-container">
                          <span class="profile-full-info-image mx-2 p-0">
                              <img src="images/tomilloprofile.png" alt="MyProfile">
                          </span>
                      </div>
                      <div class="col-container d-flex align-items-start flex-column">
                          <h3 class="mb-0 pb-0">Heber Abiel Perez Jimenez</h3>
                          <p class="carrera pb-1 pt-0 mt-0">LMAD</p>
                          <div class="d-flex flex-column align-items-start">
                              <div>
                                  <p class="me-3">Nivel 1</p>
                                  <img src="images/TomilloCoin.png" alt="" width="20">
                                  <p class="me-3">-12 TomilloCoins</p>
                              </div>
                              <p>elhebereber777@gmail.com</p>
                          </div>
                          <p class="online">En línea</p>
                      </div>
                  </div>
              </div>
              <div class="row files-container d-flex flex-column align-items-end">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                          <button class="nav-link active" id="multimedia-tab" data-bs-toggle="tab" data-bs-target="#multimedia-tab-pane" type="button" role="tab" aria-controls="multimedia-tab-pane" aria-selected="true">Archivos multimedia</button>
                      </li>
                      <li class="nav-item" role="presentation">
                          <button class="nav-link" id="documents-tab" data-bs-toggle="tab" data-bs-target="#documents-tab-pane" type="button" role="tab" aria-controls="documents-tab-pane" aria-selected="false">Documentos</button>
                      </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active" id="multimedia-tab-pane" role="tabpanel" aria-labelledby="multimedia-tab" tabindex="0">
                          <div class="files">
                              <div class="nav-bar-files-container">
                                  <div class="user-files">
                                      <img class="p-3" src="images/torso.png" alt="">
                                  </div>
                                  <div class="user-files">
                                      <img class="p-3" src="images/FondoFinal.png" alt="">
                                  </div>
                                  <!-- Otros archivos multimedia -->
                              </div>
                          </div>
                      </div>
                      <div class="tab-pane fade" id="documents-tab-pane" role="tabpanel" aria-labelledby="documents-tab" tabindex="0">
                          <div class="files">
                              <div class="nav-bar-docs-container">
                                  <div class="user-docs m-3">
                                      <h3 class="m-4">Word lalalala.doc</h3>
                                      <button class="btn btn-block m-4">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                          </svg>
                                      </button>
                                  </div>
                                  <!-- Otros documentos -->
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
      `;
  
      // Reemplaza el contenido del contenedor con el nuevo contenido
      contentContainer.innerHTML = newContent;
  }
  
  // Función para volver al chat
  function goBack() {
      // Reemplaza el contenido con el contenido original del chat (puedes usar el contenido original aquí)
      var contentContainer = document.getElementById('content-container');
      contentContainer.innerHTML = `
          <div class="profile-info d-flex align-items-center" onclick="showUserDetails()">
                            <div class="col-container">
                                <span class="profile-info-image m-1">
                                    <img src="images/tomilloprofile.png" alt="MyProfile">
                                </span>
                            </div>
                            <div class="col-container d-flex align-items-start flex-column">
                                <h3 id="current_chat_name">Heber Abiel Perez Jimenez</h3>
                                <p id="current_chat_status">En línea</p>
                            </div>
                        </div>
                        <div class="row chat d-flex flex-column">
                            <div class="nav-bar-chat-container" id="message-container">
                                <div class="row">
                                    <div class="col-7 d-flex justify-content-start p-4 pt-2 pb-0">
                                        <div class="messages p-2">
                                            <p>moka chan ga oshiete kureta ironna mita meni narera puninan ndatte dore dore</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row d-flex flex-row-reverse">
                                    <div class="col-7 d-flex justify-content-end p-2 pt-2 pb-1">
                                        <div class="user-messages p-2">
                                            <p>ok</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-container d-flex justify-content-center p-0 pt-2">
                                        <div class="date p-5 pt-0 pb-0">
                                            <p>Hoy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 p-0">
                                <div class="message-container p-2 m-1">
                                    <form action="">
                                        <input type="hidden" id="chat_id" value="">
                                        <div class="input-group mb-6 m-2">
                                            <div class="btn-group dropup">
                                                <button type="button" class="btn-add" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <img src="images/Add.png" alt="Add" class="add-image">
                                                </button>
                                                <ul class="dropdown-menu">
                                                  <li><a class="dropdown-item d-flex align-items-center padding-end-2 padding-start-0" href="#">
                                                    <img src="images/camara-fotografica.png" alt="+" width="23" class="mx-2 margin-start-0">
                                                    Fotos y videos</a></li>
                                                  <li><a class="dropdown-item d-flex align-items-center padding-end-2 padding-start-0" href="#">
                                                    <img src="images/doc.png" alt="+" width="25" class="mx-2 margin-start-0">
                                                    Documentos</a></li>
                                                </ul>
                                            </div>
                                            <input type="text" id="input_message" placeholder="Escribe un mensaje..." class="search-bar" aria-label="Text input with dropdown button">
                                            <button class="btn-normal" id="send_btn" type="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                                    </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
      `;
  }
  



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
