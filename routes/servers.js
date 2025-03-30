const express = require("express");
const serverController = require("../controllers/serverController");
const isAdminMiddleware = require("../middleware/isAdmin");

const router = express.Router();

/**
 * @swagger
 * /api/servers:
 *   get:
 *     summary: GET all servers
 *     tags: [Servers]
 *     description: Retourne tous les serveurs enregistres dans la bd
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "afrique de l'ouest"
 *                 center:
 *                   type: object
 *                   properties:
 *                      type:
 *                          type: string
 *                          example: Point
 *                      coordinates:
 *                          type: array
 *                          items:
 *                              type: number
 *                          example: [102.0, 0.5]
 *                 pricing:
 *                   type: decimal
 *                   example: 12.5

 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *                 message: "Internal Server Error"
 * 
 * @swagger
 * /api/servers/{id}:
 *   get:
 *     summary: GET any server with specify id
 *     tags: [Servers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id de la server
 *         schema:
 *           type: integer
 *         example:
 *           1
 *     description: Retourne la server possédant l'id correspondante
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "afrique de l'ouest"
 *                 center:
 *                   type: object
 *                   properties:
 *                      type:
 *                          type: string
 *                          example: Point
 *                      coordinates:
 *                          type: array
 *                          items:
 *                              type: number
 *                          example: [102.0, 0.5]
 *                 pricing:
 *                   type: decimal
 *                   example: 12.5
 * 
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *                 message: "Internal Server Error"
 * 
 */
router.get('', isAdminMiddleware, serverController.all);
router.get('/:id', isAdminMiddleware, serverController.get);
router.get('/zone-servers', isAdminMiddleware, serverController.zoneServers);
router.post('', isAdminMiddleware, serverController.create);
router.patch('/:id', isAdminMiddleware, serverController.update);
router.delete('/:id', isAdminMiddleware, serverController.delete);

module.exports = router;