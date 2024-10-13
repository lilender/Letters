USE letters;

DROP PROCEDURE IF EXISTS sp_update_usuarios;

DELIMITER $$

CREATE PROCEDURE sp_update_usuarios (
	IN opcion			VARCHAR(10),
	IN nombres			VARCHAR(50), 
    IN apellido_paterno VARCHAR(50),
    IN apellido_materno VARCHAR(50),
    IN correo           VARCHAR(50),
    IN contrasena_hash  CHAR(64),
    IN f_nacimiento     DATE,
    IN XP               SMALLINT,
    IN imagen           BLOB,
    IN carrera          VARCHAR(50),
	IN ID_usuario		INT
)
BEGIN

	IF opcion = 'agregar' THEN
        INSERT INTO usuarios (nombres, apellido_paterno, apellido_materno, correo, contrasena_hash, f_nacimiento, estatus, f_ultimo_acceso, imagen, ID_carrera)
		VALUES (
			nombres, 
			apellido_paterno, 
			apellido_materno, 
			correo, 
			SHA2(contrasena_hash, 256),
			f_nacimiento, 
			false,
            CURRENT_TIMESTAMP,
			imagen, 
			(SELECT ID_carrera FROM carreras c WHERE c.carrera = carrera)
		);
    END IF;
    IF opcion = 'inicio' THEN
        
        SET @ID_usuario_var = (SELECT u.ID_usuario FROM usuarios u WHERE u.correo = correo);
        
		IF (SELECT u.contrasena_hash FROM usuarios u WHERE u.ID_usuario = (SELECT @ID_usuario_var)) = SHA2(contrasena_hash, 256) THEN
			SELECT * FROM usuarios u WHERE u.ID_usuario = (SELECT @ID_usuario_var);
            IF (SELECT u.f_ultimo_acceso FROM usuarios u WHERE u.ID_usuario = (SELECT @ID_usuario_var)) <= NOW() - INTERVAL 2 DAY THEN
				UPDATE usuarios u
				SET u.estatus = true,
					u.racha = 0,
                    u.f_ultimo_acceso = NOW()
				WHERE u.ID_usuario = (SELECT @ID_usuario_var);
			ELSE
				IF (SELECT u.f_ultimo_acceso FROM usuarios u WHERE u.ID_usuario = (SELECT @ID_usuario_var)) <= NOW() - INTERVAL 1 DAY THEN
					UPDATE usuarios u
					SET u.estatus = true,
						u.racha = u.racha + 1,
                        u.f_ultimo_acceso = NOW()
					WHERE u.ID_usuario = (SELECT @ID_usuario_var);
				ELSE 
					UPDATE usuarios u
					SET u.estatus = true,
                    u.f_ultimo_acceso = NOW()
					WHERE u.ID_usuario = (SELECT @ID_usuario_var);
				END IF;
			END IF;
        ELSE
            SELECT 'Error' AS mensaje;
        END IF;
    END IF;
    IF opcion = 'salida' THEN
        UPDATE usuarios u
        SET u.estatus = false
        WHERE u.ID_usuario = ID_usuario;
    END IF;


END$$

DELIMITER ;
