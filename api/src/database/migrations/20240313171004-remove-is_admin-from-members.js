'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('members', 'is_admin');
     
  },

  async down (queryInterface, Sequelize) {
    return true;
  }
};
