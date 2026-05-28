'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'productId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'Products', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await query.removeColumn('Orders', 'productId');
  }
};
