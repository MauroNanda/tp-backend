const Socio = require('../models/Socio');

const getSocios = async (req, res) => {
  try {
    const socios = await Socio.findAll();
    res.json(socios);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener socios', error });
  }
};

const getSociosActivos = async (req, res) => {
  try {
    const socios = await Socio.findAll({ where: { activo: true } });
    res.json(socios);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener socios activos', error });
  }
};

const createSocio = async (req, res) => {
  try {
    const { body } = req;
    const nuevoSocio = await Socio.create(body);
    res.json(nuevoSocio);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear socio', error });
  }
};

const updateSocio = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    
    const socio = await Socio.findByPk(id);
    if (!socio) {
      return res.status(404).json({ msg: 'Socio no encontrado' });
    }

    await socio.update(body);
    res.json(socio);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar socio', error });
  }
};

const deleteSocio = async (req, res) => {
  try {
    const { id } = req.params;
    
    const socio = await Socio.findByPk(id);
    if (!socio) {
      return res.status(404).json({ msg: 'Socio no encontrado' });
    }

    await socio.destroy(); // Físico. Para lógico sería socio.update({ activo: false })
    res.json({ msg: 'Socio eliminado', socio });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar socio', error });
  }
};

module.exports = {
  getSocios,
  getSociosActivos,
  createSocio,
  updateSocio,
  deleteSocio
};
