'use strict';

module.exports = (sequelize, DataTypes) => {
    const ProductOrder = sequelize.define('ProductOrder', {
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

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
            onDelete: 'CASCADE'
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,   // null if cart purchase
            references: { model: 'Products', key: 'id' },
            onDelete: 'SET NULL'
        },

        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,   // null if direct product purchase
            references: { model: 'Carts', key: 'id' },
            onDelete: 'SET NULL'
        },

        purchaseType: {
            type: DataTypes.ENUM('direct', 'cart'),
            allowNull: false,
            defaultValue: 'direct'
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

    ProductOrder.associate = (models) => {
        ProductOrder.belongsTo(models.Product, { foreignKey: 'productId' });
    };

    return ProductOrder;
}



