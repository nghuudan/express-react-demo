const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');
const routes = require('./routes');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./webpack-react-babel-starter/dist/'));
app.use('/api', routes);

const server = app.listen(8888, () => {
  const addr = server.address();
  logger.info('Server running at ' + addr.address + ' on port ' + addr.port);
});
