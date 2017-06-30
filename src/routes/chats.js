const express = require('express');
const responseError = require('../utils/response-error');
const chatService = require('../services/chat-service');
const router = express.Router();

router.get('/', (req, res) => {
  chatService.getAllChats()
    .then(chats => res.json(chats))
    .catch(responseError(res));
});

router.get('/:id', (req, res) => {
  chatService.getChatById(req.params.id)
    .then(chat => res.json(chat.get()))
    .catch(responseError(res));
});

router.get('/:id/users', (req, res) => {
  chatService.getChatUsers(req.params.id)
    .then(users => res.json(users))
    .catch(responseError(res));
});

router.get('/:id/messages', (req, res) => {
  chatService.getChatMessages(req.params.id)
    .then(messages => res.json(messages))
    .catch(responseError(res));
});

router.post('/', (req, res) => {
  chatService.createChat(req.body)
    .then(chat => res.json(chat.get()))
    .catch(responseError(res));
});

router.put('/:id', (req, res) => {
  chatService.updateChat({id: req.params.id, chat: req.body})
    .then(chat => res.json(chat.get()))
    .catch(responseError(res));
});

router.delete('/:id', (req, res) => {
  chatService.deleteChat(req.params.id)
    .then(chat => res.json(chat.get()))
    .catch(responseError(res));
});

module.exports = router;
