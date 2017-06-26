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
    first_name: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    active: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    create_date: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    },
    last_update: {
      allowNull: false,
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE
    }
  });
};
