import { Router } from "express";
import { updateDeviceStatus } from "./device.status.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Device Status
 *   description: Update device status
 */

/**
 * @swagger
 * /api/devices/{id}/status:
 *   patch:
 *     summary: Update device status
 *     tags: [Device Status]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Device ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, LOST, STOLEN]
 *     responses:
 *       200:
 *         description: Device status updated
 */
router.patch("/:id/status", authMiddleware, updateDeviceStatus);

export default router;
