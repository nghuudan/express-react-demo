const logger = require('./logger');

module.exports = silent => {
  return err => {
    logger.error(err);
    if (!silent) {
      throw err;
    }
  };
};
