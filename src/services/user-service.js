const db = require('../database');
const logger = require('../utils/logger');

exports.getAllUsers = () => db.models.user.findAll()
  .then(users => users)
  .catch(err => {
    logger.error(err);
    return err;
  });

exports.getUserById = id => db.models.user.findOne({
  where: {
    id
  }
}).then(user => {
  if (user) {
    return user.get();
  } else {
    return null;
  }
}).catch(err => {
  logger.error(err);
  return err;
});

exports.createUser = userToCreate => db.models.user.create(userToCreate)
  .then(user => user.get())
  .catch(err => {
    logger.error(err);
    return err;
  });

exports.updateUser = (id, user) => db.models.user.findOne({
  where: {
    id
  }
}).then(userToUpdate => {
  if (userToUpdate) {
    user.last_update = new Date();
    return userToUpdate.update(user).then(() => userToUpdate.get());
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
    return userToDelete.destroy().then(() => userToDelete.get());
  } else {
    return null;
  }
}).catch(err => {
  logger.error(err);
  return err;
});
