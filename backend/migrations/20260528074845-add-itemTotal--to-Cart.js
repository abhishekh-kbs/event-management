'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Carts', 'itemTotal', {

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Carts', 'itemTotal')
  }
};
