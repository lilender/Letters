function register() {
    let alert = "";

    if ($("#file").get(0).files.length === 0) {
        alert += "Seleccione una imagen de perfil\n";
    }
    if ($("#name").val().trim() == "") {
        alert += "Ingrese su nombre\n";
    }
    if ($("#name").val().trim().length > 50) {
        alert += "El nombre no debe exceder los 50 caracteres\n";
    }
    if ($("#lastname").val().trim() == "") {
        alert += "Ingrese su apellido paterno\n";
    }
    if ($("#lastname").val().trim().length > 50) {
        alert += "El apellido paterno no debe exceder los 50 caracteres\n";
    }
    if ($("#secondlastname").val().trim() == "") {
        alert += "Ingrese su apellido materno\n";
    }
    if ($("#secondlastname").val().trim().length > 50) {
        alert += "El apellido materno no debe exceder los 50 caracteres\n";
    }
    if ($("#email").val().trim() == "") {
        alert += "Ingrese su correo\n";
    }
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+([a-z0-9\.!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9]+\.)+[a-z0-9]+/;
    if(!regex.test($("#email").val().trim())){
        alert += "Ingrese un correo válido\n";
    }
    if($("#email").val().trim().length > 50){
        alert += "El correo no debe exceder los 50 caracteres\n";
    }
    let fecha = $("#datePicker").val().trim();
    if (fecha == "") {
        alert += "Ingrese su fecha de nacimiento\n";
    }
    let minDate = new Date('1900-01-01');
    let today = new Date();
    let inputDate = new Date(fecha);
    if (inputDate < minDate || inputDate > today) {
        alert += "Ingrese una fecha de nacimiento válida\n";
    }
    if($("#career").val() == ""){
        alert += "Seleccione una carrera\n";
    }
    if($("#password").val().trim() == ""){
        alert += "Ingrese una contraseña\n";
    }
    if($("#password").val().trim().length > 64){
        alert += "La contraseña no debe exceder los 64 caracteres\n";
    }
    let pass = $("#password").val().trim();
    regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[(¡”#$%&/=’?¡¿:;,.\-_+*{\][})])(?=.{8,64})/;
    if(!regex.test(pass)){
        alert += "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial\n";
    }
    if($("#password2").val().trim() == ""){
        alert += "Confirme su contraseña\n";
    }
    if($("#password").val().trim() != $("#password2").val().trim()){
        alert += "Las contraseñas no coinciden\n";
    }

    if(alert != ""){
        alertCustom(alert);
        return false;
    }
    
    Swal.fire({
        title: "Registro exitoso",
        color: '#86bd7b',
        background: '#679CB1',
        confirmButtonOutline: 'none',
        confirmButtonText: "Aceptar",
        iconColor: '#0C1F50',
        icon: "success",
        customClass: {
            confirmButton: 'btn p-1 px-5 w-200',
            title: 'text-class mt-3',
            icon: 'icons'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        }
    });
    
}

function alertCustom(title){
    Swal.fire({
        title: title,
        background: '#679CB1',
        confirmButtonOutline: 'none',
        confirmButtonText: "Aceptar",
        iconColor: '#0C1F50',
        icon: "info",
        customClass: {
          confirmButton: 'btn p-1 px-5 w-200',
          title: 'text-class mt-3',
          icon: 'icons'
        },
        });
}