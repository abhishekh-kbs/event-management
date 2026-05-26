// migrations/xxxx-create-product-orders.js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductOrders', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      razorpay_order_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      razorpay_payment_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      razorpay_signature: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // who paid
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: true,   // null if cart purchase
        references: { model: 'Products', key: 'id' },
        onDelete: 'SET NULL'
      },

      cartId: {
        type: Sequelize.INTEGER,
        allowNull: true,   // null if direct product purchase
        references: { model: 'Carts', key: 'id' },
        onDelete: 'SET NULL'
      },

      purchaseType: {
        type: Sequelize.ENUM('direct', 'cart'),
        allowNull: false,
        defaultValue: 'direct'
      },

      amount: {
        type: Sequelize.INTEGER,  // in paise
        allowNull: true
      },

      currency: {
        type: Sequelize.STRING,
        defaultValue: 'INR'
      },

      paymentStatus: {
        type: Sequelize.ENUM('pending', 'paid', 'failed', 'refunded'),
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ProductOrders');
  }
};