const { DataTypes } = require('sequelize');
const { db } = require('../db/config');
const Empleado = require('./Empleado');

const Publicacion = db.define('Publicacion', {
  Título: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ImagenAsociada: {
    type: DataTypes.TEXT, // base64 can be long
    allowNull: true
  },
  fechaPublicación: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vigente: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

// Relationships
Empleado.hasMany(Publicacion, { foreignKey: 'empleadoId' });
Publicacion.belongsTo(Empleado, { foreignKey: 'empleadoId' });

module.exports = Publicacion;
