module.exports = (sequelize, DataTypes) => {
  return sequelize.define('chat_user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    }
  });
};
