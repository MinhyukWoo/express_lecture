const { Model, DataTypes } = require("sequelize");
module.exports = function (sequelize) {
  class Screen extends Model {}
  Screen.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Screen",
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Screen.associate = function (db) {
    db.Screen.belongsTo(db.Movie, { foreignKey: { primaryKey: true, allowNull: false } });
  };
  return Screen;
};
