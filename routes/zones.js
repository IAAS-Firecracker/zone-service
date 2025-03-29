const express = require("express");
const zoneController = require("../controllers/zoneController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /api/zones:
 *   get:
 *     summary: GET all zones
 *     tags: [Zones]
 *     description: Retourne toutes les zones enregistrees dans la bd
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
 * /api/zones/{id}:
 *   get:
 *     summary: GET any zone with specify id
 *     tags: [Zones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id de la zone
 *         schema:
 *           type: integer
 *         example:
 *           1
 *     description: Retourne la zone possédant l'id correspondante
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
router.get('', authMiddleware, zoneController.all);
router.get('/:id', authMiddleware, zoneController.get);
router.post('', authMiddleware, zoneController.create);
router.patch('/:id', authMiddleware, zoneController.update);
router.delete('/:id', authMiddleware, zoneController.delete);

module.exports = router;