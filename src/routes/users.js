const express = require('express');
const userService = require('../services/user-service');
const router = express.Router();

router.get('/', (req, res) => {
  userService.getAllUsers()
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  userService.getUserById(req.params.id)
    .then(user => res.json(user.get()))
    .catch(err => res.status(500).json(err));
});

router.get('/:id/chats', (req, res) => {
  userService.getUserChats(req.params.id)
    .then(chats => res.json(chats))
    .catch(err => res.status(500).json(err));
});

router.get('/:id/messages', (req, res) => {
  userService.getUserMessages(req.params.id)
    .then(messages => res.json(messages))
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  userService.createUser(req.body)
    .then(user => res.json(user.get()))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  userService.updateUser({id: req.params.id, user: req.body})
    .then(user => res.json(user.get()))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  userService.deleteUser(req.params.id)
    .then(user => res.json(user.get()))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
