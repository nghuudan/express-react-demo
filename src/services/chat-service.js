const db = require('../database');
const logger = require('../utils/logger');
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

exports.attributes = attributes;

exports.getAllChats = () => db.models.chat.findAll({
  attributes,
  include: [
    ownerInclude
  ]
}).then(chats => chats).catch(err => {
  logger.error(err);
  return err;
});

exports.getChatById = id => db.models.chat.findOne({
  attributes,
  where: {
    id
  },
  include: [
    ownerInclude
  ]
}).then(chat => {
  if (chat) {
    return chat;
  } else {
    return null;
  }
}).catch(err => {
  logger.error(err);
  return err;
});

exports.createChat = chatToCreate => db.models.chat.create(chatToCreate)
  .then(chat => chat)
  .catch(err => {
    logger.error(err);
    return err;
  });

exports.updateChat = (id, chat) => db.models.chat.findOne({
  where: {
    id
  }
}).then(chatToUpdate => {
  if (chatToUpdate) {
    chat.lastUpdate = new Date();
    return chatToUpdate.update(chat).then(() => chatToUpdate);
  } else {
    return null;
  }
}).catch(err => {
  logger.error(err);
  return err;
});

exports.deleteChat = id => db.models.chat.findOne({
  where: {
    id
  }
}).then(chatToDelete => {
  if (chatToDelete) {
    return chatToDelete.destroy().then(() => chatToDelete);
  } else {
    return null;
  }
}).catch(err => {
  logger.error(err);
  return err;
});