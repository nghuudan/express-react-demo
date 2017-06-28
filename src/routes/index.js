const express = require('express');
const users = require('./users');
const chats = require('./chats');
const messages = require('./messages');
const router = express.Router();

router.use('/users', users);
router.use('/chats', chats);
router.use('/messages', messages);

module.exports = router;
