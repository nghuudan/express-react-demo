const winston = require('winston');

winston.add(winston.transports.File, {
  filename: 'error.log',
  level: 'error'
});

module.exports = winston;
