// models/Empresa.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion-squalize');

const Empresa = sequelize.define('Empresa', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  razon_social: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'empresa',
  timestamps: false
});

module.exports = Empresa;
