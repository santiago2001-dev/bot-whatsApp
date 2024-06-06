// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/conexion-squalize');
const Empresa = require('./Empresa');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empresa,
      key: 'id'
    }
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

// Definir la relación
Usuario.belongsTo(Empresa, { foreignKey: 'id_empresa' });

module.exports = Usuario;
