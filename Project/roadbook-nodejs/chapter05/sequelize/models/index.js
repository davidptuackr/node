const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.newCustomer = require('./customer')(sequelize, Sequelize);
db.newPurchase = require('./purchase')(sequelize, Sequelize);

db.newCustomer.hasMany(db.newPurchase, {foreignKey: 'customer_id', sourceKey: 'id'});
db.newPurchase.belongsTo(db.newCustomer, {foreignKey: 'customer_id', sourceKey: 'id'});

module.exports = db;

/*
'use strict';
const fs = require('fs');
const path = require('path');

const process = require('process');
const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
*/