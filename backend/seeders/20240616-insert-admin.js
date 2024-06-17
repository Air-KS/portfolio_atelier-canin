'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const existingUser = await queryInterface.rawSelect('Register', {
        where: {
          email: 'admin@example.com',
        },
      }, ['id']);

      if (existingUser) {
        console.log('Admin user already exists, skipping insertion.');
        return;
      }

      const hashedPassword = await bcrypt.hash('password123', 10);

      // Créer une entrée dans la table Register avec is_admin: true
      await queryInterface.bulkInsert('Register', [{
        email: 'admin@example.com',
        password: hashedPassword,
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date()
      }]);

      // Récupérer l'ID de l'enregistrement inséré
      const register = await queryInterface.rawSelect('Register', {
        where: {
          email: 'admin@example.com',
        },
      }, ['id']);

      // Créer une entrée correspondante dans la table UsersInfo
      return queryInterface.bulkInsert('UsersInfo', [{
        register_id: register,
        last_name: 'Nom de Famille',
        first_name: 'Prénom',
        date_of_birth: "01/01/2000",
        email: 'admin@example.com',
        phone: "+336.07.08.09.10",
        address_one:"Ta première Adresse",
        address_two:"Ta 2ème Adresse",
        city: "Ta Ville",
        zip_code:"Ton Code Postal",
        country:"Ton pays",
        created_at: new Date(),
        updated_at: new Date()
      }]);
    } catch (error) {
      console.error("Erreur lors de l'insertion de l'utilisateur admin :", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      const register = await queryInterface.rawSelect('Register', {
        where: {
          email: 'admin@example.com',
        },
      }, ['id']);

      if (!register) {
        throw new Error('User "admin@example.com" not found in Register');
      }

      // Supprimer l'entrée dans UsersInfo
      await queryInterface.bulkDelete('UsersInfo', { register_id: register }, {});

      // Supprimer l'entrée dans Register
      return queryInterface.bulkDelete('Register', { id: register }, {});
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur admin :", error);
      throw error;
    }
  }
};
