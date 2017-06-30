module.exports = res => {
  return err => {
    res.status(500).json(err);
  };
};
