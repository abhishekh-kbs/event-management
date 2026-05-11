'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EventDeletionFeedbacks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      eventId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('EventDeletionFeedbacks');
  },
};