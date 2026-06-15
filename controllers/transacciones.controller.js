const Transaccion = require('../models/Transaccion');

const getTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.findAll();
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener transacciones', error });
  }
};

const getHistorialCliente = async (req, res) => {
  try {
    const { email } = req.params;
    const transacciones = await Transaccion.findAll({ where: { emailCliente: email } });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener historial', error });
  }
};

const getTransaccionesPorIdioma = async (req, res) => {
  try {
    const { origen, destino } = req.params;
    const transacciones = await Transaccion.findAll({ 
      where: { 
        IdiomaOrigen: origen,
        IdiomaDestino: destino
      } 
    });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ msg: 'Error al filtrar por idioma', error });
  }
};

const createTransaccion = async (req, res) => {
  try {
    const { body } = req;
    const nuevaTransaccion = await Transaccion.create(body);
    res.json(nuevaTransaccion);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear transaccion', error });
  }
};

module.exports = {
  getTransacciones,
  getHistorialCliente,
  getTransaccionesPorIdioma,
  createTransaccion
};
