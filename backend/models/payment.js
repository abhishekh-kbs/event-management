'use strict';

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        razorpay_order_id: {
            type: DataTypes.STRING,
            allowNull: false
        },

        razorpay_payment_id: {
            type: DataTypes.STRING,
            allowNull: true
        },

        razorpay_signature: {
            type: DataTypes.STRING,
            allowNull: true
        },


        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        currency: {
            type: DataTypes.STRING,
            defaultValue: 'INR'
        },

        paymentStatus: {
            type: DataTypes.ENUM('pending', 'paid', 'failed'),
            defaultValue: 'pending'
        },

        receipt: {
            type: DataTypes.STRING,
            allowNull: true
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    Order.associate = (models) => {
        Order.belongsTo(models.Product, { foreignKey: "productId" });
    };

    return Order;
}



