const express = require('express');
const responseError = require('../utils/response-error');
const messageService = require('../services/message-service');
const router = express.Router();

router.get('/', (req, res) => {
  messageService.getAllMessages()
    .then(messages => res.json(messages))
    .catch(responseError(res));
});

router.get('/:id', (req, res) => {
  messageService.getMessageById(req.params.id)
    .then(message => res.json(message.get()))
    .catch(responseError(res));
});

router.get('/:id/users', (req, res) => {
  messageService.getMessageUsers(req.params.id)
    .then(users => res.json(users))
    .catch(responseError(res));
});

router.get('/:id/chats', (req, res) => {
  messageService.getMessageChats(req.params.id)
    .then(chats => res.json(chats))
    .catch(responseError(res));
});

router.post('/', (req, res) => {
  messageService.createMessage(req.body)
    .then(message => res.json(message.get()))
    .catch(responseError(res));
});

router.put('/:id', (req, res) => {
  messageService.updateMessage({id: req.params.id, message: req.body})
    .then(message => res.json(message.get()))
    .catch(responseError(res));
});

router.delete('/:id', (req, res) => {
  messageService.deleteMessage(req.params.id)
    .then(message => res.json(message.get()))
    .catch(responseError(res));
});

module.exports = router;
