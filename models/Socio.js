const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const Socio = db.define('Socio', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING, // URL de imagen
    allowNull: true
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  numeroSocio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Socio;
