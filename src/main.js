const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./database');
const userService = require('./services/user-service');
const chatService = require('./services/chat-service');
const logger = require('./utils/logger');
const routes = require('./routes');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./webpack-react-babel-starter/dist/'));
app.use('/api', routes);

db.sync({ force: true })
  .then(() => {
    logger.info('Database is ready');

    userService.createUser({
      username: 'aaron',
      password: 'demo',
      firstName: 'Aaron',
      lastName: 'Adams',
      active: true
    }).then(user => {
      chatService.createChat({
        name: 'My Chat',
        ownerId: user.id,
        active: true
      }).then(chat => {
        chat.addUser(user);
      }).catch(err => logger.error(err));
    }).catch(err => logger.error(err));
  })
  .catch(err => logger.error(err));

const server = app.listen(8888, () => {
  const addr = server.address();
  logger.info('Server is running at ' + addr.address + ' on port ' + addr.port);
});
