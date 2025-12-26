import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";
import { scanDevice } from "../controllers/movement.controller.js";

const movementRouter = express.Router();

/**
 * SCAN DEVICE (ENTRY / EXIT)
 * Barcode scanner | Camera | Manual
 */

movementRouter.post(
  "/scan",
  requireAuth,
  requireRole("security_staff", "security_chief"),
  scanDevice
);

export default movementRouter;
