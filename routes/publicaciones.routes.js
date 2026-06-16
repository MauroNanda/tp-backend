const { Router } = require('express');
const {
  getPublicaciones,
  buscarPublicaciones,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
} = require('../controllers/publicaciones.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Publicaciones
 *   description: API para gestión de publicaciones de empleados
 */

/**
 * @swagger
 * /api/publicaciones:
 *   get:
 *     summary: Obtiene todas las publicaciones (incluye info del empleado)
 *     tags: [Publicaciones]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 */
router.get('/', getPublicaciones);

/**
 * @swagger
 * /api/publicaciones/buscar:
 *   post:
 *     summary: Búsqueda combinada de publicaciones (mediante Body)
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Título:
 *                 type: string
 *               vigente:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Lista de publicaciones filtradas
 */
router.post('/buscar', buscarPublicaciones); // SOPORTA POST con body: Título, vigente

/**
 * @swagger
 * /api/publicaciones/buscar:
 *   get:
 *     summary: Búsqueda combinada de publicaciones (mediante Query Params)
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: query
 *         name: Título
 *         schema:
 *           type: string
 *       - in: query
 *         name: vigente
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista de publicaciones filtradas
 */
router.get('/buscar', buscarPublicaciones);  // SOPORTA GET con query: ?Título=x&vigente=true

/**
 * @swagger
 * /api/publicaciones:
 *   post:
 *     summary: Crea una nueva publicación
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Título:
 *                 type: string
 *               Contenido:
 *                 type: string
 *               fechaPublicación:
 *                 type: string
 *               empleado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Publicación creada
 */
router.post('/', createPublicacion);

/**
 * @swagger
 * /api/publicaciones/{id}:
 *   put:
 *     summary: Modifica una publicación existente
 *     tags: [Publicaciones]
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
 *               Título:
 *                 type: string
 *               Contenido:
 *                 type: string
 *               vigente:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Publicación modificada
 *       404:
 *         description: Publicación no encontrada
 */
router.put('/:id', updatePublicacion);

/**
 * @swagger
 * /api/publicaciones/{id}:
 *   delete:
 *     summary: Elimina físicamente una publicación
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publicación eliminada
 *       404:
 *         description: Publicación no encontrada
 */
router.delete('/:id', deletePublicacion);

module.exports = router;
