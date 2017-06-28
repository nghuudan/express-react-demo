module.exports = (sequelize, DataTypes) => {
  return sequelize.define('message', {
    channel: {
      allowNull: false,
      defaultValue: 'PUBLIC',
      type: DataTypes.ENUM('PUBLIC', 'PRIVATE', 'GLOBAL', 'SYSTEM')
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(1024)
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
