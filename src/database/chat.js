module.exports = (sequelize, DataTypes) => {
  return sequelize.define('chat', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(64),
      unique: true
    },
    active: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    createDate: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    lastUpdate: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  });
};
