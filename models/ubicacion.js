const { DataTypes } = require("sequelize");
const sequelize = require("../db/conexion-squalize");
const Ubicacion = sequelize.define(
  "Ubicacion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    longitud: {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitud: {
        type: DataTypes.STRING,
        allowNull: true
      },
      conductor: {
        type: DataTypes.INTEGER,
        allowNull: true

      },
      fecha :{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },

      tipo: {
        type: DataTypes.INTEGER,
        allowNull: true


    },

    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: true


    }

  },
  {
    tableName: "ubicacion",
    timestamps: false,
  }
);
module.exports = Ubicacion;
