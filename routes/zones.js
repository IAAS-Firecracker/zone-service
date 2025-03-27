const express = require("express");
const zoneController = require("../controllers/zoneController");

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
router.get('', zoneController.all);
router.get('/:id', zoneController.get);
router.post('', zoneController.create);
router.patch('/:id', zoneController.update);
router.delete('/:id', zoneController.delete);

module.exports = router;