const { Router } = require('express');
const {
  getTransacciones,
  getHistorialCliente,
  getTransaccionesPorIdioma,
  createTransaccion
} = require('../controllers/transacciones.controller');

const router = Router();

router.get('/', getTransacciones);
router.get('/historial/:email', getHistorialCliente);
router.get('/filtrar/:origen/:destino', getTransaccionesPorIdioma);
router.post('/', createTransaccion);

module.exports = router;
