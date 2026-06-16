const { Router } = require('express');
const {
  getSocios,
  getSociosActivos,
  createSocio,
  updateSocio,
  deleteSocio
} = require('../controllers/socios.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Socios
 *   description: API para gestión de socios
 */

/**
 * @swagger
 * /api/socios:
 *   get:
 *     summary: Obtiene todos los socios
 *     tags: [Socios]
 *     responses:
 *       200:
 *         description: Lista de socios
 */
router.get('/', getSocios);

/**
 * @swagger
 * /api/socios/activos:
 *   get:
 *     summary: Obtiene todos los socios activos
 *     tags: [Socios]
 *     responses:
 *       200:
 *         description: Lista de socios activos
 */
router.get('/activos', getSociosActivos); // Debe ir antes de /:id si hubiera

/**
 * @swagger
 * /api/socios:
 *   post:
 *     summary: Crea un nuevo socio
 *     tags: [Socios]
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
 *               numeroSocio:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Socio creado
 */
router.post('/', createSocio);

/**
 * @swagger
 * /api/socios/{id}:
 *   put:
 *     summary: Modifica un socio existente
 *     tags: [Socios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Socio modificado
 *       404:
 *         description: Socio no encontrado
 */
router.put('/:id', updateSocio);

/**
 * @swagger
 * /api/socios/{id}:
 *   delete:
 *     summary: Elimina físicamente un socio
 *     tags: [Socios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Socio eliminado
 *       404:
 *         description: Socio no encontrado
 */
router.delete('/:id', deleteSocio);

module.exports = router;
