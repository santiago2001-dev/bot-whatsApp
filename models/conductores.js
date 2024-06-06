// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion-squalize');
const Empresa = require('./Empresa');
const Conductores = sequelize.define('Conductores', {
id_cedula: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  Nombre_apellido: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  foto_conductor: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  numero_contacto: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  arl: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  fecha_arl: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fecha_manipulacion_alimentos: {
    type: DataTypes.DATE,
    allowNull: true
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'conductores',
  timestamps: false 
});

Conductores.belongsTo(Empresa, { foreignKey: 'id_empresa' }); // Asumiendo que tienes un modelo Empresa definido

module.exports = Conductores;