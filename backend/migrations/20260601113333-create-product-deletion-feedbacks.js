'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductDeletionFeedbacks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ProductDeletionFeedbacks')
  }
};
