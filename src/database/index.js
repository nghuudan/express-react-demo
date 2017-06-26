const Sequelize = require('sequelize');
const logger = require('../utils/logger');
const userService = require('../services/user-service');

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

User.sync({ force: true }).then(() => {
  userService.createUser({
    username: 'aaron',
    password: 'demo',
    first_name: 'Aaron',
    last_name: 'Adams',
    active: true
  }).then(user => logger.info('createUser:', user));
}).catch(error => logger.error(error));

module.exports = database;
