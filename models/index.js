const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

// Import models
const User = require('./users')(sequelize, Sequelize.DataTypes);
const Report = require('./report')(sequelize, Sequelize.DataTypes);
const Turbine = require('./turbine')(sequelize, Sequelize.DataTypes);

// Create models object
const models = {
  User,
  Report,
  Turbine,
  sequelize
};

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;