'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "userId" });
    Cart.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return Cart;

};

// npx sequelize-cli migration:create --name add-productId--to-table



