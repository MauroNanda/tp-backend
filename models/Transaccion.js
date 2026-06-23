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

// PUNTO 3: Modificar estructura de Transaccion agregando un atributo del tipo Cliente
const Cliente = require('./Cliente');

// Esto establece la relación en la base de datos (clave foránea clienteId en Transaccion) y permite que Sequelize incluya (join) el objeto Cliente al consultar una Transaccion.
Cliente.hasMany(Transaccion, { foreignKey: 'clienteId' });
Transaccion.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'Cliente' });

module.exports = Transaccion;
