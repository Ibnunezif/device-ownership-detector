import { Router } from "express";
import { scanDevice } from "./scan.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Scan
 *   description: Scan devices at gates
 */

/**
 * @swagger
 * /api/devices/scan:
 *   post:
 *     summary: Scan a device (Security role)
 *     tags: [Scan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Device verified
 */
router.post("/scan", authMiddleware, requireRole("SECURITY"), scanDevice);

export default router;
