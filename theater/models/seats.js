const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Seat extends Model {}
  Seat.init(
    {
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
      foreignKey: { primaryKey: true, allowNull: false },
    });
  };
  return Seat;
};
