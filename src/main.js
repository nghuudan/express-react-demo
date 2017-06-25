const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const app = express();

app.use(morgan('dev'));
app.use(express.static('./webpack-react-babel-starter/dist/'));

const server = app.listen(8888, () => {
  const addr = server.address();
  logger.info('Server running at ' + addr.address + ' on port ' + addr.port);
});
