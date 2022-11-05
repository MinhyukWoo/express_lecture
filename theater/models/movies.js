const { Model, DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  class Movie extends Model {}
  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
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

  Movie.associate = function (db) {
    db.Movie.hasMany(db.Screen, {
      foreignKey: { name: "screenMovie", allowNull: false, primaryKey: true },
      sourceKey: "id",
    });
  };
  return Movie;
};
