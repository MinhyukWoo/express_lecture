const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {}
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(30),
      },
      price: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 30,
      },
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Product;
};
