const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const Transaccion = db.define('Transaccion', {
  IdiomaOrigen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  TextoOrigen: {
    type: DataTypes.STRING, // Changed from number to string because it's text
    allowNull: false
  },
  IdiomaDestino: {
    type: DataTypes.STRING,
    allowNull: false
  },
  TextoDestino: {
    type: DataTypes.STRING, // Changed from number to string because it's text
    allowNull: false
  },
  emailCliente: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Transaccion;
