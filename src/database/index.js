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

module.exports = database;
