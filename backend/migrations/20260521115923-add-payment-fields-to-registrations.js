'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Registrations', 'paymentId', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Registrations', 'paymentStatus', {
      type: Sequelize.ENUM('pending', 'paid', 'failed'),
      defaultValue: 'pending'
    });
  },

  async down(queryInterface, Sequelize) {
    await query.removeColumn('Registrations', 'paymentId');
    await query.removeColumn('Registrations', 'paymentStatus');
  }
};
