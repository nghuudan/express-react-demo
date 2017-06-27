const db = require('../database');
const logger = require('../utils/logger');
const hashPassword = require('../utils/hash-password');

const attributes = [
  'id',
  'username',
  'firstName',
  'lastName',
  'createDate',
  'lastUpdate'
];

exports.attributes = attributes;

exports.getAllUsers = () => db.models.user.findAll({ attributes })
  .then(users => users)
  .catch(err => {
    logger.error(err);
    return err;
  });

exports.getUserById = id => db.models.user.findOne({
  attributes,
  where: {
    id
  }
}).then(user => {
  if (user) {
    return user;
  } else {
    return null;
  }
}).catch(err => {
  logger.error(err);
  return err;
});

exports.createUser = userToCreate => {
  const salt = 'my_salt_' + Date.now();
  userToCreate.password = hashPassword(userToCreate.password, salt);
  userToCreate.salt = salt;

  return db.models.user.create(userToCreate)
    .then(user => user)
    .catch(err => {
      logger.error(err);
      return err;
    });
};

exports.updateUser = (id, user) => db.models.user.findOne({
  where: {
    id
  }
}).then(userToUpdate => {
  if (userToUpdate) {
    if (user.password) {
      const salt = 'my_salt_' + Date.now();
      user.password = hashPassword(user.password, salt);
      user.salt = salt;
    }
    user.lastUpdate = new Date();
    return userToUpdate.update(user).then(() => userToUpdate);
  } else {
    return null;
  }
}).catch(err => {
  logger.error(err);
  return err;
});

exports.deleteUser = id => db.models.user.findOne({
  where: {
    id
  }
}).then(userToDelete => {
  if (userToDelete) {
    return userToDelete.destroy().then(() => userToDelete);
  } else {
    return null;
  }
}).catch(err => {
  logger.error(err);
  return err;
});
