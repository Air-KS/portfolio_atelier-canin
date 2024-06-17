/*
  ./backend/models/register.js
*/

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Register extends Model {
    static associate(models) {
      Register.hasOne(models.UsersInfo, { foreignKey: 'register_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    }
  }
  Register.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'Register',
    tableName: 'Register',
    timestamps: true,
    underscored: true,
  });
  return Register;
};
