-- DO NOT USE

CALL sp_update_usuarios(
    'agregar',           -- opcion
    'John',              -- nombres
    'Doe',               -- apellido_paterno
    'Smith',             -- apellido_materno
    'user@example.com',  -- correo
    'john_doe',          -- usuario
    'securepassword',    -- contrasena_hash
    '1990-01-01',        -- f_nacimiento,
    NULL,				 -- XP
    NULL,                -- imagen (BLOB data can be NULL for now)
    'LMAD',         -- carrera (this will be used to find ID_carrera)
    NULL			-- ID_usuario
);

CALL sp_update_usuarios(
    'inicio',           -- opcion
    NULL,              -- nombres
    NULL,               -- apellido_paterno
    NULL,             -- apellido_materno
    NULL,  -- correo
    'john_doe',          -- usuario
    'securepassword',    -- contrasena_hash
    NULL,        -- f_nacimiento,
    NULL,				 -- XP
    NULL,                -- imagen (BLOB data can be NULL for now)
    NULL,         -- carrera (this will be used to find ID_carrera)
    NULL			-- ID_usuario
);

CALL sp_update_usuarios(
    'salida',           -- opcion
    NULL,              -- nombres
    NULL,               -- apellido_paterno
    NULL,             -- apellido_materno
    NULL,  -- correo
    NULL,          -- usuario
    NULL,    -- contrasena_hash
    NULL,        -- f_nacimiento,
    NULL,				 -- XP
    NULL,                -- imagen (BLOB data can be NULL for now)
    NULL,         -- carrera (this will be used to find ID_carrera)
    1			-- ID_usuario
);
SELECT * FROM usuarios;

SET @ID_usuario_var = (SELECT ID_usuario FROM usuarios u WHERE u.usuario = 'john_doe');
        SELECT  @ID_usuario_var AS DebugMessage;