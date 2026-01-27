import { Router } from "express";
import { registerDevice } from "./device.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Device registration and management
 */

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Register a new device
 *     tags: [Devices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brand
 *               - serialNumber
 *               - photoUrl
 *             properties:
 *               brand:
 *                 type: string
 *               serialNumber:
 *                 type: string
 *               photoUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Device registered
 */
router.post("/", authMiddleware, registerDevice);

export default router;
