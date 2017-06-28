const express = require('express');
const messageService = require('../services/message-service');
const router = express.Router();

router.get('/', (req, res) => {
  messageService.getAllMessages()
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  messageService.getMessageById(req.params.id)
    .then(message => res.json(message.get()))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  messageService.createMessage(req.body)
    .then(message => res.json(message.get()))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  messageService.updateMessage(req.params.id, req.body)
    .then(message => res.json(message.get()))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  messageService.deleteMessage(req.params.id)
    .then(message => res.json(message.get()))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
