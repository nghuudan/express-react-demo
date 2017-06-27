let count = 0;
module.exports = salt => (++count) + salt + Date.now();
