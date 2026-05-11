'use strict';

module.exports = (sequelize, DataTypes) => {
    const EventDeletionFeedback = sequelize.define(
        'EventDeletionFeedback',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                autoIncrement: true,
                primaryKey: true
            },
            eventId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            userId: {
                type: DataTypes.INTEGER,
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

    return EventDeletionFeedback;
};