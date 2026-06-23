const Empleado = require('../models/Empleado');

const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener empleados', error });
  }
};

const getEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      return res.status(404).json({ msg: 'Empleado no encontrado' });
    }
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener empleado', error });
  }
};

const createEmpleado = async (req, res) => {
  try {
    const { body } = req;
    const nuevoEmpleado = await Empleado.create(body);
    res.json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear empleado', error });
  }
};

const deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);
    if (!empleado) {
      return res.status(404).json({ msg: 'Empleado no encontrado' });
    }
    await empleado.destroy();
    res.json({ msg: 'Empleado eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar empleado', error });
  }
};

module.exports = {
  getEmpleados,
  getEmpleado,
  createEmpleado,
  deleteEmpleado
};
