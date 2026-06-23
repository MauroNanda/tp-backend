const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

// PUNTO 1: Definición del nuevo modelo Cliente
const Cliente = db.define('Cliente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Cliente;
