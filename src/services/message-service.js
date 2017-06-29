const db = require('../database');
const handleError = require('../utils/handle-error');

exports.getAllMessages = () => db.models.message.findAll()
  .then(messages => messages)
  .catch(handleError());

exports.getMessageById = id => db.models.message.findOne({
  where: {
    id
  }
}).then(message => {
  if (message) {
    return message;
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
