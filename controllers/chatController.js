const ChatModel = require('../models/chatModel');

const chatController = {
    getAllChats: (req, res) => {
        ChatModel.getAllChats(req.body['ID_usuario'], (err, result) => {
            if (err) {
                console.log('Error fetching chats:', err);
                return res.status(500).json({ success: false, message: 'Error fetching chats' });
            }
            res.json({ success: true, chats: result });
        });
    },

    newChat: (req, res) => {
        const { ID_usuario, ID_usuario2 } = req.body;

        if (!ID_usuario || !ID_usuario2) {
            return res.status(400).json({ success: false, message: 'Missing user IDs' });
        }

        ChatModel.newChat(ID_usuario, ID_usuario2, (err, result) => {
            if (err) {
                console.log('Error creating chat:', err);
                return res.status(500).json({ success: false, message: 'Error creating chat' });
            }
            res.json({ success: true, result });
        });
    },
};


module.exports = chatController;