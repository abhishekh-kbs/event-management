'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'isDeleted', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    })

    await queryInterface.addColumn('Products', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'isDeleted');
    await queryInterface.removeColumn('Products', 'deletedAt');
  }
};
