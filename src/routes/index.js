const express = require('express');
const users = require('./users');
const chats = require('./chats');
const router = express.Router();

router.use('/users', users);
router.use('/chats', chats);

module.exports = router;
