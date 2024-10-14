const db = require('../db');

const ChatModel = {
    getAllChats: (userId, callback) => {
        const query = 'SELECT * FROM chats WHERE ID_usuario_a = ? OR ID_usuario_b = ?';
        db.query(query, [userId, userId], callback);
    },
    newChat: (userA, userB, callback) => {
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
};

module.exports = ChatModel;