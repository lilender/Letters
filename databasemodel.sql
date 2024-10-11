CREATE DATABASE letters;
USE letters;

DROP TABLE IF EXISTS mensajes;
DROP TABLE IF EXISTS DMs;
DROP TABLE IF EXISTS archivosEntrega;
DROP TABLE IF EXISTS archivosTarea;
DROP TABLE IF EXISTS archivosChat;
DROP TABLE IF EXISTS entregas;
DROP TABLE IF EXISTS tareas;
DROP TABLE IF EXISTS usuarios_grupos;
DROP TABLE IF EXISTS grupos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS carreras;
DROP TABLE IF EXISTS chats;

CREATE TABLE carreras (
    ID_carrera  TINYINT AUTO_INCREMENT PRIMARY KEY,
    carrera     VARCHAR(50) NOT NULL
);
CREATE TABLE usuarios (
    ID_usuario          INT AUTO_INCREMENT PRIMARY KEY,
    nombres             VARCHAR(50) NOT NULL,
    apellido_paterno    VARCHAR(50) NOT NULL,
    apellido_materno    VARCHAR(50) NOT NULL,
    correo              VARCHAR(50) UNIQUE NOT NULL,
    usuario             VARCHAR(50) UNIQUE NOT NULL,
    contrasena_hash     CHAR(64) NOT NULL,
    f_nacimiento        DATE NOT NULL,
    f_registro          DATETIME DEFAULT CURRENT_TIMESTAMP,
    estatus             BOOLEAN, -- 1 = activo, 0 = inactivo
    XP                  SMALLINT UNSIGNED DEFAULT 0,
    f_ultimo_acceso     DATETIME ON UPDATE CURRENT_TIMESTAMP,
    racha               SMALLINT UNSIGNED DEFAULT 0,
    imagen              BLOB,
    ID_carrera          TINYINT,
    FOREIGN KEY (ID_carrera) REFERENCES carreras(ID_carrera)
);
CREATE TABLE chats (
    ID_chat     INT AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE DMs (
    ID_DM           INT AUTO_INCREMENT PRIMARY KEY,
    ID_chat         INT,
    ID_usuario_a    INT,
    ID_usuario_b    INT,
    FOREIGN KEY (ID_chat) REFERENCES chats(ID_chat),
    FOREIGN KEY (ID_usuario_a) REFERENCES usuarios(ID_usuario),
    FOREIGN KEY (ID_usuario_b) REFERENCES usuarios(ID_usuario)
);
CREATE TABLE grupos (
    ID_grupo    INT AUTO_INCREMENT PRIMARY KEY,
    nombre      VARCHAR(50) NOT NULL,
    imagen      BLOB,
    ID_chat     INT,
    ID_admin    INT,
    FOREIGN KEY (ID_chat) REFERENCES chats(ID_chat),
    FOREIGN KEY (ID_admin) REFERENCES usuarios(ID_usuario)
);
CREATE TABLE mensajes (
    ID_mensaje  BIGINT AUTO_INCREMENT PRIMARY KEY,
    mensaje     TEXT NOT NULL,
    f_envio     DATETIME DEFAULT CURRENT_TIMESTAMP,
    estatus     BOOLEAN, -- 1 = recibido, 0 = enviado
    ID_chat     INT,
    ID_usuario  INT,
    FOREIGN KEY (ID_chat) REFERENCES chats(ID_chat),
    FOREIGN KEY (ID_usuario) REFERENCES usuarios(ID_usuario)
);
CREATE TABLE tareas (
    ID_tarea    INT AUTO_INCREMENT PRIMARY KEY,
    titulo      VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    f_limite    DATE NOT NULL,
    puntaje     SMALLINT UNSIGNED NOT NULL,
    ID_grupo    INT,
    FOREIGN KEY (ID_grupo) REFERENCES grupos(ID_grupo)
);
CREATE TABLE entregas (
    ID_entrega      INT AUTO_INCREMENT PRIMARY KEY,
    f_entrega       DATE,
    estatus         BOOLEAN, -- 1 = entregado, 0 = no entregado
    calificacion    SMALLINT UNSIGNED,
    ID_tarea        INT,
    ID_usuario      INT,
    FOREIGN KEY (ID_tarea) REFERENCES tareas(ID_tarea),
    FOREIGN KEY (ID_usuario) REFERENCES usuarios(ID_usuario)
);
CREATE TABLE archivosChat (
    ID_archivoChat  INT AUTO_INCREMENT PRIMARY KEY,
    archivo         BLOB,
    ID_chat         INT,
    FOREIGN KEY (ID_chat) REFERENCES chats(ID_chat)
);
CREATE TABLE archivosTarea (
    ID_archivoTarea INT AUTO_INCREMENT PRIMARY KEY,
    archivo         BLOB,
    ID_tarea        INT,
    FOREIGN KEY (ID_tarea) REFERENCES tareas(ID_tarea)
);
CREATE TABLE archivosEntrega (
    ID_archivoEntrega   INT AUTO_INCREMENT PRIMARY KEY,
    archivo             BLOB,
    ID_entrega          INT,
    FOREIGN KEY (ID_entrega) REFERENCES entregas(ID_entrega)
);
CREATE TABLE usuarios_grupos (
    ID_usuario  INT,
    ID_grupo    INT,
    PRIMARY KEY (ID_usuario, ID_grupo),
    FOREIGN KEY (ID_usuario) REFERENCES usuarios(ID_usuario),
    FOREIGN KEY (ID_grupo) REFERENCES grupos(ID_grupo)
);