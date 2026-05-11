'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'AccountDeletionFeedbacks',
      'userId'
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'AccountDeletionFeedbacks', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    }
    )
  }
};
