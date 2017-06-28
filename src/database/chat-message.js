module.exports = (sequelize, DataTypes) => {
  return sequelize.define('chat_message', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    }
  });
};
