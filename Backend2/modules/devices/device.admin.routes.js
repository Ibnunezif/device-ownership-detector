import { Router } from "express";
import {
  getAllDevices,
  getStolenDevices,
} from "./device.admin.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin Devices
 *   description: Admin-only device management
 */

/**
 * @swagger
 * /api/admin/devices:
 *   get:
 *     summary: Get all devices
 *     tags: [Admin Devices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of devices
 */
router.get("/", authMiddleware, requireRole("ADMIN"), getAllDevices);

/**
 * @swagger
 * /api/admin/devices/stolen:
 *   get:
 *     summary: Get all stolen devices
 *     tags: [Admin Devices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of stolen devices
 */
router.get("/stolen", authMiddleware, requireRole("ADMIN"), getStolenDevices);

export default router;
