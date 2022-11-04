const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  class Movie extends Model {}
  Movie.init(
    {
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Movie",
      timestamps: true,
      charset: "utf8",
      paranoid: true,
      collate: "utf8_general_ci",
    }
  );
  return Movie;
};
