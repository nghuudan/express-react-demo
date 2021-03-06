module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    username: {
      allowNull: false,
      type: DataTypes.STRING(64),
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(128)
    },
    salt: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(64)
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
