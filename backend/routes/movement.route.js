import express from "express";
import mockRequireAuth from "../middleware/mockRequireAuth.js";
import {
  createMovement,
  getMovements,
  scanDevice,
} from "../controllers/movement.controller.js";

const movementRouter = express.Router();

movementRouter.post("/create", mockRequireAuth, createMovement);
movementRouter.get("/all", mockRequireAuth, getMovements);
movementRouter.post("/scan", mockRequireAuth, scanDevice);
// Audit logging only: no update or delete endpoints

export default movementRouter;
