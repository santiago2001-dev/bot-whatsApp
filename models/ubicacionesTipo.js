const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion-squalize');

const UbicacionesTipo = sequelize.define('UbicacionesTipo', {
  id_ubicacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre : {
    type: DataTypes.STRING,
    allowNull: true
  }
  // otros campos...
}, {
  tableName: 'ubicaciones_tipo',
  timestamps: false
});

module.exports = UbicacionesTipo;
