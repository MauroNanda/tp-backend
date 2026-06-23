const { Router } = require('express');
const {
  getTransacciones,
  getHistorialCliente,
  getTransaccionesPorIdioma,
  createTransaccion,
  deleteTransaccion
} = require('../controllers/transacciones.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Transacciones
 *   description: API para logs de traducciones
 */

/**
 * @swagger
 * /api/transacciones:
 *   get:
 *     summary: Obtiene todas las transacciones
 *     tags: [Transacciones]
 *     responses:
 *       200:
 *         description: Lista de transacciones
 */
router.get('/', getTransacciones);

/**
 * @swagger
 * /api/transacciones/historial/{email}:
 *   get:
 *     summary: Obtiene el historial de un cliente por email
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de transacciones del cliente
 */
router.get('/historial/:email', getHistorialCliente);

/**
 * @swagger
 * /api/transacciones/filtrar/{origen}/{destino}:
 *   get:
 *     summary: Filtra transacciones por idiomas de origen y destino
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: origen
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: destino
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de transacciones filtradas
 */
router.get('/filtrar/:origen/:destino', getTransaccionesPorIdioma);

/**
 * @swagger
 * /api/transacciones:
 *   post:
 *     summary: Registra una nueva transacción
 *     tags: [Transacciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdiomaOrigen:
 *                 type: string
 *               TextoOrigen:
 *                 type: string
 *               IdiomaDestino:
 *                 type: string
 *               TextoDestino:
 *                 type: string
 *               emailCliente:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transacción registrada
 */
router.post('/', createTransaccion);

/**
 * @swagger
 * /api/transacciones/{id}:
 *   delete:
 *     summary: Elimina una transaccion
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaccion eliminada
 */
router.delete('/:id', deleteTransaccion);

module.exports = router;
