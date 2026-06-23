const { Router } = require('express');
const { createCliente, getClientes } = require('../controllers/clientes.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API para gestión de clientes
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', getClientes);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente (Consigna 2)
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               dni:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado
 */
router.post('/', createCliente);

module.exports = router;
