const Sequelize = require('sequelize');

const database = new Sequelize('express_react_demo', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

const User = database.import('./user');
const Chat = database.import('./chat');
const ChatUser = database.import('./chat-user');
const ChatMessage = database.import('./chat-message');
const Message = database.import('./message');
const MessageUser = database.import('./message-user');

Chat.Owner = Chat.belongsTo(User, { as: 'owner' });

Chat.Users = Chat.belongsToMany(User, {
  through: {
    model: ChatUser,
    unique: false
  },
  foreignKey: 'chatId',
  constraints: false
});

User.Chats = User.belongsToMany(Chat, {
  through: {
    model: ChatUser,
    unique: false
  },
  foreignKey: 'userId',
  constraints: false
});

Chat.Messages = Chat.belongsToMany(Message, {
  through: {
    model: ChatMessage,
    unique: false
  },
  foreignKey: 'chatId',
  constraints: false
});

Message.Sender = Message.belongsTo(User, { as: 'sender' });

Message.Recipients = Message.belongsToMany(User, {
  through: {
    model: MessageUser,
    unique: false
  },
  foreignKey: 'messageId',
  constraints: false
});

Message.Chats = Message.belongsToMany(Chat, {
  through: {
    model: ChatMessage,
    unique: false
  },
  foreignKey: 'messageId',
  constraints: false
});

module.exports = database;
