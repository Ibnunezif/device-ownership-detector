import express from "express";
import mockRequireAuth from "../middleware/mockRequireAuth.js";
import {
  createMovement,
  getMovements,
  scanDevice,
  getAlertMovements,
} from "../controllers/movement.controller.js";

const movementRouter = express.Router();

movementRouter.post("/create", mockRequireAuth, createMovement);
movementRouter.get("/all", mockRequireAuth, getMovements);
movementRouter.post("/scan", mockRequireAuth, scanDevice);
movementRouter.get("/alerts", mockRequireAuth, getAlertMovements);

export default movementRouter;
