const ChatModel = require('../models/ChatModel');

const chatController = {
    getDMs: (req, res) => {
        ChatModel.getDMs(req.body['ID_usuario'], (err, result) => {
            if (err) {
                console.log('Error fetching chats:', err);
                return res.status(500).json({ success: false, message: 'Error fetching chats' });
            }
            res.json({ success: true, chats: result });
        });
    },

    newDM: (req, res) => {
        const { ID_usuario, ID_usuario2 } = req.body;

        if (!ID_usuario || !ID_usuario2) {
            return res.status(400).json({ success: false, message: 'Missing user IDs' });
        }

        ChatModel.newDM(ID_usuario, ID_usuario2, (err, result) => {
            if (err) {
                console.log('Error creating chat:', err);
                return res.status(500).json({ success: false, message: 'Error creating chat' });
            }
            res.json({ success: true, result });
        });
    },

    getUsersFromChat: (chatID, callback) => {
        ChatModel.getUsersFromChat(chatID, callback);
    }
};


module.exports = chatController;