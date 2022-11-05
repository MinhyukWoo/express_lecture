const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Seat extends Model {}
  Seat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      state: {
        type: DataTypes.ENUM("reserved", "disable", "enable"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Seat",
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Seat.associate = function (db) {
    db.Seat.belongsTo(db.Screen, {
      foreignKey: { name: "screen", allowNull: false, primaryKey: true },
      targetKey: "id",
    });
  };
  return Seat;
};
