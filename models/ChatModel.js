const db = require('../db');

const ChatModel = {
    getDMs: (userId, callback) => {
        const query = `
            SELECT 
                DMs.ID_chat, 
                DMs.ID_usuario_a, 
                DMs.ID_usuario_b, 
                ua.nombres AS usuario_a_nombres, 
                ua.apellido_paterno AS usuario_a_apellido_paterno, 
                ua.apellido_materno AS usuario_a_apellido_materno, 
                ua.correo AS usuario_a_correo, 
                ua.estatus AS usuario_a_estatus,
                ub.nombres AS usuario_b_nombres, 
                ub.apellido_paterno AS usuario_b_apellido_paterno, 
                ub.apellido_materno AS usuario_b_apellido_materno, 
                ub.correo AS usuario_b_correo, 
                ub.estatus AS usuario_b_estatus
            FROM DMs
            JOIN usuarios ua ON DMs.ID_usuario_a = ua.ID_usuario
            JOIN usuarios ub ON DMs.ID_usuario_b = ub.ID_usuario
            WHERE DMs.ID_usuario_a = ? OR DMs.ID_usuario_b = ?
        `;
        db.query(query, [userId, userId], callback);
    },
    
    newDM: (userA, userB, callback) => {
        const query1 = 'INSERT INTO chats () VALUES ()';
        db.query(query1, (err, result) => {
            if (err) {
                return callback(err);
            }

            const chatId = result.insertId;

            const query2 = 'INSERT INTO DMs (ID_chat, ID_usuario_a, ID_usuario_b) VALUES (?, ?, ?)';
            db.query(query2, [chatId, userA, userB], callback);
        });
    },

    getUsersFromChat: (chatID, callback) => {
        const query = `
            SELECT ID_usuario_a, ID_usuario_b
            FROM DMs
            WHERE ID_chat = ?
        `;
        db.query(query, [chatID], callback);
    }
};

module.exports = ChatModel;