const { Router } = require('express');
const {
  getEmpleados,
  getEmpleado,
  createEmpleado
} = require('../controllers/empleados.controller');

const router = Router();

router.get('/', getEmpleados);
router.get('/:id', getEmpleado);
router.post('/', createEmpleado);

module.exports = router;
