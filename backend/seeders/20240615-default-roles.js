/*
  backend/seeders/20240615-default-roles.js
*/

'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Roles', [
      { id: 1, role: 'client', created_at: new Date(), updated_at: new Date() },
      { id: 2, role: 'responsable', created_at: new Date(), updated_at: new Date() },
      { id: 3, role: 'admin', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
