'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Events', 'priceAmount', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Events', 'priceAmount', {
      type: Sequelize.FLOAT,
      defaultValue: 0
    });
  }
};
