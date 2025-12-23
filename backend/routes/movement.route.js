import express from "express";
import mockRequireAuth from "../middleware/mockRequireAuth.js";
import {
  createMovement,
  getMovements,
} from "../controllers/movement.controller.js";

const movementRouter = express.Router();

movementRouter.post("/create", mockRequireAuth, createMovement);
movementRouter.get("/all", mockRequireAuth, getMovements);
// Audit logging only: no update or delete endpoints

export default movementRouter;
