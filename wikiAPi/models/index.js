const { sequelize } = require('../lib/postgresql');
const { DataTypes } = require('sequelize');

// uniendo los modelos

const models = {
  User: require('./user')(sequelize, DataTypes),
  Post: require('./post')(sequelize, DataTypes),
  Category: require('./category')(sequelize, DataTypes),
  Comment: require('./comment')(sequelize, DataTypes),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = models;
