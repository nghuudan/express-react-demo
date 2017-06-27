const express = require('express');
const chatService = require('../services/chat-service');
const router = express.Router();

router.get('/', (req, res) => {
  chatService.getAllChats()
    .then(chats => res.json(chats))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  chatService.getChatById(req.params.id)
    .then(chat => res.json(chat.get()))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  chatService.createChat(req.body)
    .then(chat => res.json(chat.get()))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  chatService.updateChat(req.params.id, req.body)
    .then(chat => res.json(chat.get()))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  chatService.deleteChat(req.params.id)
    .then(chat => res.json(chat.get()))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
