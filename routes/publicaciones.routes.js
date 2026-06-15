const { Router } = require('express');
const {
  getPublicaciones,
  buscarPublicaciones,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
} = require('../controllers/publicaciones.controller');

const router = Router();

router.get('/', getPublicaciones);
router.post('/buscar', buscarPublicaciones); // SOPORTA POST con body: Título, vigente
router.get('/buscar', buscarPublicaciones);  // SOPORTA GET con query: ?Título=x&vigente=true
router.post('/', createPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);

module.exports = router;
