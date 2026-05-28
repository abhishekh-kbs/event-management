'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Product;
};