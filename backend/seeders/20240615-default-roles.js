/*
  backend/seeders/20240615-default-roles.js
*/

'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Roles', [
      { id: 1, role: 'client', },
      { id: 2, role: 'manager', },
      { id: 3, role: 'admin', },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
