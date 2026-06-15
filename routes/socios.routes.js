const { Router } = require('express');
const {
  getSocios,
  getSociosActivos,
  createSocio,
  updateSocio,
  deleteSocio
} = require('../controllers/socios.controller');

const router = Router();

router.get('/', getSocios);
router.get('/activos', getSociosActivos); // Debe ir antes de /:id si hubiera
router.post('/', createSocio);
router.put('/:id', updateSocio);
router.delete('/:id', deleteSocio);

module.exports = router;
