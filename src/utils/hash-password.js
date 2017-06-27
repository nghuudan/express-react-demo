const crypto = require('crypto');

const hashPassword = (password, salt) => {
  try {
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
    return key.toString('hex');
  } catch (err) {
    return null;
  }
};

module.exports = hashPassword;
