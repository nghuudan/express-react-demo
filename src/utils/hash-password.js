const crypto = require('crypto');

const hashPassword = (password, salt) => {
  const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  return key.toString('hex');
};

module.exports = hashPassword;
