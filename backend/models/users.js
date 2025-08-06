module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM('client', 'manufacturer'),
      allowNull: false,
      defaultValue: 'client'
    },
  });

  User.associate = models => {
    User.hasMany(models.Report, {
      foreignKey: 'userId',
      as: 'reports'
    });
    User.hasMany(models.Turbine, {
      foreignKey: 'userId',
      as: 'turbines'
    });
  };

  return User;
};