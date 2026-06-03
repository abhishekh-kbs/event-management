'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProductDeletionFeedback = sequelize.define(
        'ProductDeletionFeedback',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                autoIncrement: true,
                primaryKey: true
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: true
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
        }
    );

    return ProductDeletionFeedback;
};