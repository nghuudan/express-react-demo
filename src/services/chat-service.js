const db = require('../database');
const handleError = require('../utils/handle-error');
const userService = require('./user-service');

const attributes = [
  'id',
  'name',
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

exports.getAllChats = () => db.models.chat.findAll({
  attributes,
  include: [
    ownerInclude,
    usersInclude
  ]
}).then(chats => chats).catch(handleError());

exports.getChatById = id => db.models.chat.findOne({
  attributes,
  where: {
    id
  },
  include: [
    ownerInclude,
    usersInclude,
    messagesInclude
  ]
}).then(chat => {
  if (chat) {
    return chat;
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
        .then(() => chat)
        .catch(handleError());
    }).catch(handleError());
  }
  return null;
}).catch(handleError());

exports.createChat = chatToCreate => db.models.chat.create(chatToCreate, {
  include: [db.models.user]
}).then(chat => chat).catch(handleError());

exports.updateChat = ({id, chat}) => db.models.chat.findOne({
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
