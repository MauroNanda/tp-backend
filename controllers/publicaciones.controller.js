const Publicacion = require('../models/Publicacion');
const Empleado = require('../models/Empleado');
const { Op } = require('sequelize');

const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      include: {
        model: Empleado,
        attributes: ['nombre', 'apellido', 'email']
      }
    });
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener publicaciones', error });
  }
};

const buscarPublicaciones = async (req, res) => {
  try {
    // Acepta parametros por body (POST) o query params (GET)
    const Título = req.body.Título || req.query.Título || '';
    let vigente = req.body.vigente;
    if (vigente === undefined) vigente = req.query.vigente;
    
    const whereClause = {};
    if (Título) {
      whereClause.Título = { [Op.iLike]: `%${Título}%` }; // Postgres usa iLike para case-insensitive
    }
    if (vigente !== undefined && vigente !== '') {
      whereClause.vigente = vigente === true || vigente === 'true';
    }

    const publicaciones = await Publicacion.findAll({
      where: whereClause,
      include: { model: Empleado }
    });
    
    res.json(publicaciones);
  } catch (error) {
    res.status(500).json({ msg: 'Error al buscar publicaciones', error });
  }
};

const createPublicacion = async (req, res) => {
  try {
    const { empleado, ...resto } = req.body;
    let empleadoId = empleado;
    
    if (typeof empleado === 'object' && empleado !== null) {
      empleadoId = empleado.id;
    }

    // PLUS: Validar que el empleado realmente exista antes de insertar
    const empleadoExiste = await Empleado.findByPk(empleadoId);
    if (!empleadoExiste) {
      return res.status(404).json({ msg: `El empleado con ID ${empleadoId} no existe. Crea un empleado primero.` });
    }

    const nuevaPublicacion = await Publicacion.create({
      ...resto,
      empleadoId
    });

    res.json(nuevaPublicacion);
  } catch (error) {
    // Si es un error gigante de Sequelize, extraemos solo el mensaje corto
    const mensajeCorto = error.message || 'Error desconocido en la base de datos';
    res.status(500).json({ msg: 'Error al crear publicación: ' + mensajeCorto });
  }
};

const updatePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ msg: 'Publicación no encontrada' });
    }

    await publicacion.update(body);
    res.json(publicacion);
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar publicacion', error });
  }
};

const deletePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ msg: 'Publicación no encontrada' });
    }

    await publicacion.destroy();
    res.json({ msg: 'Publicación eliminada' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar publicacion', error });
  }
};

module.exports = {
  getPublicaciones,
  buscarPublicaciones,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
};
