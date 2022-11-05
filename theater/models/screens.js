const { Model, DataTypes } = require("sequelize");
const db = require(".");
module.exports = function (sequelize) {
  class Screen extends Model {}
  Screen.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
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
    db.Screen.hasMany(db.Seat, {
      foreignKey: {
        name: "screen",
        allowNull: false,
        primaryKey: true,
      },
      sourceKey: "id",
    });
    db.Screen.belongsTo(db.Movie, {
      foreignKey: { name: "screenMovie", allowNull: false, primaryKey: true },
      targetKey: "id",
    });
  };
  return Screen;
};
