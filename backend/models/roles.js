/*
  ./backend/models/roles.js
*/

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.UsersInfo, { foreignKey: 'role_id' });
      Role.hasMany(models.Register, { foreignKey: 'role_id' });
    }
  }
  Role.init({
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles',
    timestamps: true,
    underscored: true,
  });
  return Role;
};
