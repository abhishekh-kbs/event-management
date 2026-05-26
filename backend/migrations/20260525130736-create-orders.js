'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      razorpay_order_id: {
        type: Sequelize.STRING,
        allowNull: false
      },

      razorpay_payment_id: {
        type: Sequelize.STRING,
        allowNull: true
      },

      razorpay_signature: {
        type: Sequelize.STRING,
        allowNull: true
      },


      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      currency: {
        type: Sequelize.STRING,
        defaultValue: 'INR'
      },

      paymentStatus: {
        type: Sequelize.ENUM('pending', 'paid', 'failed'),
        defaultValue: 'pending'
      },

      receipt: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
