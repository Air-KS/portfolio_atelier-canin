/*
  backend/models/index.js
*/

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
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

// Synchroniser les utilisateurs (Users)
db.User.hasMany(db.Appointment, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.Appointment.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Synchroniser les rôles (Roles)
db.Role.hasMany(db.User, { foreignKey: 'role_id' });
db.User.belongsTo(db.Role, { foreignKey: 'role_id' });

// Synchroniser les services (Services)
db.Service.hasMany(db.Appointment, { foreignKey: 'service_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
db.Appointment.belongsTo(db.Service, { foreignKey: 'service_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

// Synchroniser la base de données
sequelize.sync({ logging: false });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
