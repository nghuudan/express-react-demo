const db = require('../database');
const handleError = require('../utils/handle-error');
const userService = require('./user-service');
const chatService = require('./chat-service');

const attributes = [
  'id',
  'channel',
  'content',
  'createDate',
  'lastUpdate'
];

const senderInclude = {
  attributes: userService.attributes,
  model: db.models.user,
  as: 'sender'
};

exports.attributes = attributes;
exports.senderInclude = senderInclude;

exports.getAllMessages = () => db.models.message.findAll()
  .then(messages => messages)
  .catch(handleError());

exports.getMessageById = id => db.models.message.findOne({
  attributes,
  where: {
    id
  },
  include: [
    senderInclude
  ]
}).then(message => {
  if (message) {
    return message;
  }
  return null;
}).catch(handleError());

exports.getMessageUsers = id => db.models.message.findOne({
  where: {
    id
  }
}).then(message => {
  if (message) {
    return message.getUsers({ attributes: userService.attributes })
      .then(users => users)
      .catch(handleError());
  }
  return null;
}).catch(handleError());

exports.getMessageChats = id => db.models.message.findOne({
  where: {
    id
  }
}).then(message => {
  if (message) {
    return message.getChats({
      attributes: chatService.attributes,
      include: [chatService.ownerInclude]
    }).then(chats => chats).catch(handleError());
  }
  return null;
}).catch(handleError());

exports.createMessage = messageToCreate => db.models.message.create(messageToCreate)
  .then(message => message)
  .catch(handleError());

exports.updateMessage = ({ id, message }) => db.models.message.findOne({
  where: {
    id
  }
}).then(messageToUpdate => {
  if (messageToUpdate) {
    message.lastUpdate = new Date();
    return messageToUpdate.update(message)
      .then(() => messageToUpdate)
      .catch(handleError());
  }
  return null;
}).catch(handleError());

exports.deleteMessage = id => db.models.message.findOne({
  where: {
    id
  }
}).then(messageToDelete => {
  if (messageToDelete) {
    return messageToDelete.destroy()
      .then(() => messageToDelete)
      .catch(handleError());
  }
  return null;
}).catch(handleError());
