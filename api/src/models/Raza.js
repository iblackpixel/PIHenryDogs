const { DataTypes, sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("raza", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      //TODO Crear el ID de manera que deba tener una B adelante del número.
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    height: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    weight: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  });
};
