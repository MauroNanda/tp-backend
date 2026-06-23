const Transaccion = require('../models/Transaccion');
const Cliente = require('../models/Cliente');

const getTransacciones = async (req, res) => {
  try {
    // PUNTO 4: Redefinición del método para recuperar transacciones incluyendo información del Cliente.
    // Usamos 'include' para que Sequelize haga un JOIN automático con la tabla Clientes y devuelva el objeto Cliente anidado dentro de cada Transacción.
    const transacciones = await Transaccion.findAll({
      include: {
        model: Cliente,
        as: 'Cliente',
        attributes: ['nombre', 'apellido', 'dni']
      }
    });
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

const deleteTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const transaccion = await Transaccion.findByPk(id);
    if (!transaccion) {
      return res.status(404).json({ msg: 'Transaccion no encontrada' });
    }
    await transaccion.destroy();
    res.json({ msg: 'Transaccion eliminada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar transaccion', error });
  }
};

module.exports = {
  getTransacciones,
  getHistorialCliente,
  getTransaccionesPorIdioma,
  createTransaccion,
  deleteTransaccion
};
