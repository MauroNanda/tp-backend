const { Router } = require('express');
const {
  getEmpleados,
  getEmpleado,
  createEmpleado
} = require('../controllers/empleados.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: API para gestión de empleados
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 */
router.get('/', getEmpleados);

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Obtiene un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del empleado
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/:id', getEmpleado);

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
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
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empleado creado
 */
router.post('/', createEmpleado);

module.exports = router;
