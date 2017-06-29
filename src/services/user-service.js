const db = require('../database');
const handleError = require('../utils/handle-error');
const generateSalt = require('../utils/generate-salt');
const hashPassword = require('../utils/hash-password');

const attributes = [
  'id',
  'username',
  'firstName',
  'lastName',
  'active',
  'createDate',
  'lastUpdate'
];

const chatsInclude = {
  model: db.models.chat,
  as: 'chats',
  through: {
    attributes: []
  }
};

exports.attributes = attributes;
exports.chatsInclude = chatsInclude;

exports.getAllUsers = () => db.models.user.findAll({ attributes })
  .then(users => users)
  .catch(handleError());

exports.getUserById = id => db.models.user.findOne({
  attributes,
  where: {
    id
  }
}).then(user => {
  if (user) {
    return user;
  }
  return null;
}).catch(handleError());

exports.getUserChats = id => db.models.user.findOne({
  where: {
    id
  }
}).then(user => {
  if (user) {
    return user.getChats()
      .then(chats => chats)
      .catch(handleError());
  }
  return null;
}).catch(handleError());

exports.getUserMessages = id => db.models.user.findOne({
  where: {
    id
  }
}).then(user => {
  if (user) {
    return user.getMessages()
      .then(messages => messages)
      .catch(handleError());
  }
  return null;
}).catch(handleError());

exports.createUser = userToCreate => {
  const salt = generateSalt('mysalt');
  userToCreate.password = hashPassword(userToCreate.password, salt);
  userToCreate.salt = salt;

  return db.models.user.create(userToCreate)
    .then(user => {
      if (user) {
        return user;
      }
      return null;
    })
    .catch(handleError());
};

exports.updateUser = ({ id, user }) => db.models.user.findOne({
  where: {
    id
  }
}).then(userToUpdate => {
  if (userToUpdate) {
    if (user.password) {
      const salt = generateSalt('mysalt');
      user.password = hashPassword(user.password, salt);
      user.salt = salt;
    }
    user.lastUpdate = new Date();
    return userToUpdate.update(user)
      .then(() => userToUpdate)
      .catch(handleError());
  }
  return null;
}).catch(handleError());

exports.deleteUser = id => db.models.user.findOne({
  where: {
    id
  }
}).then(userToDelete => {
  if (userToDelete) {
    return userToDelete.destroy()
      .then(() => userToDelete)
      .catch(handleError());
  }
  return null;
}).catch(handleError());
