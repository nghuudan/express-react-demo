const db = require('../database');
const handleError = require('../utils/handle-error');
const userService = require('./user-service');
const messageService = require('./message-service');

const attributes = [
  'id',
  'name',
  'active',
  'createDate',
  'lastUpdate'
];

const ownerInclude = {
  attributes: userService.attributes,
  model: db.models.user,
  as: 'owner'
};

const usersInclude = {
  attributes: userService.attributes,
  model: db.models.user,
  as: 'users',
  through: {
    attributes: []
  }
};

const messagesInclude = {
  model: db.models.message,
  as: 'messages',
  through: {
    attributes: []
  }
};

exports.attributes = attributes;
exports.ownerInclude = ownerInclude;
exports.usersInclude = usersInclude;
exports.messagesInclude = messagesInclude;

exports.getAllChats = () => db.models.chat.findAll()
  .then(chats => chats)
  .catch(handleError());

exports.getChatById = id => db.models.chat.findOne({
  attributes,
  where: {
    id
  },
  include: [
    ownerInclude,
    usersInclude
  ]
}).then(chat => {
  if (chat) {
    return chat;
  }
  return null;
}).catch(handleError());

exports.getChatUsers = id => db.models.chat.findOne({
  where: {
    id
  }
}).then(chat => {
  if (chat) {
    return chat.getUsers({ attributes: userService.attributes })
      .then(users => users)
      .catch(handleError());
  }
  return null;
}).catch(handleError());

exports.getChatMessages = id => db.models.chat.findOne({
  where: {
    id
  }
}).then(chat => {
  if (chat) {
    return chat.getMessages({
      attributes: messageService.attributes,
      include: [
        messageService.senderInclude
      ]
    })
      .then(messages => messages)
      .catch(handleError());
  }
  return null;
}).catch(handleError());

exports.addChatUser = ({ chatId, userId }) => db.models.chat.findOne({
  where: {
    id: chatId
  }
}).then(chat => {
  if (chat) {
    return userService.getUserById(userId).then(user => {
      return chat.addUser(user)
        .then(() => {
          return { chat, user };
        })
        .catch(handleError());
    }).catch(handleError());
  }
  return null;
}).catch(handleError());

exports.addChatMessage = ({ chatId, userId, message }) => db.models.chat.findOne({
  where: {
    id: chatId
  }
}).then(chat => {
  if (chat) {
    return messageService.createMessage({
      channel: message.channel,
      content: message.content,
      senderId: userId
    }).then(message => {
      return chat.addMessage(message).then(() => {
        return { chat, message };
      }).catch(handleError());
    }).catch(handleError());
  }
  return null;
}).catch(handleError());

exports.createChat = chatToCreate => db.models.chat.create(chatToCreate, {
  include: [db.models.user]
}).then(chat => chat).catch(handleError());

exports.updateChat = ({ id, chat }) => db.models.chat.findOne({
  where: {
    id
  }
}).then(chatToUpdate => {
  if (chatToUpdate) {
    chat.lastUpdate = new Date();
    return chatToUpdate.update(chat)
      .then(() => chatToUpdate)
      .catch(handleError());
  }
  return null;
}).catch(handleError());

exports.deleteChat = id => db.models.chat.findOne({
  where: {
    id
  }
}).then(chatToDelete => {
  if (chatToDelete) {
    return chatToDelete.destroy()
      .then(() => chatToDelete)
      .catch(handleError());
  }
  return null;
}).catch(handleError());
