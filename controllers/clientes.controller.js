const Cliente = require('../models/Cliente');

// PUNTO 2: Método para agregar un Cliente
const createCliente = async (req, res) => {
  try {
    const { nombre, apellido, dni } = req.body;

    if (!nombre || !apellido || !dni) {
      return res.status(400).json({ error: 'Faltan datos obligatorios (nombre, apellido, dni)' });
    }

    const existeCliente = await Cliente.findOne({ where: { dni } });
    if (existeCliente) {
      return res.status(400).json({ error: 'Ya existe un cliente con el DNI ingresado' });
    }

    const nuevoCliente = await Cliente.create({ nombre, apellido, dni });
    
    // Respondemos con el cliente creado y status 201 (Created)
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente', detalle: error.message });
  }
};

module.exports = { createCliente };
