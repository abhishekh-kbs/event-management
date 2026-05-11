'use strict';

module.exports = (sequelize, DataTypes) => {
    const AccountDeletionFeedback = sequelize.define(
        'AccountDeletionFeedback',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            reason: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            feedback: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {}
    );

    return AccountDeletionFeedback;
};