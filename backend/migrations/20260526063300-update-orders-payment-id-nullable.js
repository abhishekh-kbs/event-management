'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Orders', 'razorpay_payment_id', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Orders', 'razorpay_payment_id', {
      type: Sequelize.STRING,
      allowNull: false
    })
  }
};
