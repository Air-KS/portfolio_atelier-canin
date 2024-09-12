/*
  ./backend/models/store.js
*/

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Store extends Model { }

  Store.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // L'image est optionnelle
      validate: {
        isUrl: {
          msg: 'L\'URL doit être valide.',
        },
        isImage(value) {
          // Valider seulement si une valeur est fournie pour l'image
          if (value && !value.match(/\.(jpg|jpeg|png|gif)$/i)) {
            throw new Error('L\'URL doit être un fichier image (jpg, jpeg, png, gif).');
          }
        },
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Store',
    tableName: 'Stores',
    timestamps: false,
  });

  return Store;
};
