'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('AccountDeletionFeedbacks', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            username: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('AccountDeletionFeedbacks');
    },
};