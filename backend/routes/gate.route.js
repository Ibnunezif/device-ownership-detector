import express from "express";
import {
  createGate,
  updateGate,
  deleteGate,
  getGate,
  getAllGates,
} from "../controllers/gate.controller.js";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";

const gateRouter = express.Router();

// CREATE gate
gateRouter.post(
  "/create",
  requireAuth,
  requireRole("security_chief", "admin"),
  createGate
);

// UPDATE gate
gateRouter.patch(
  "/update/:id",
  requireAuth,
  requireRole("security_chief", "admin"),
  updateGate
);

// DELETE gate
gateRouter.delete(
  "/delete/:id",
  requireAuth,
  requireRole("security_chief", "admin"),
  deleteGate
);

// GET single gate
gateRouter.get(
  "/:id",
  requireAuth,
  getGate
);

// GET all gates (paginated)
gateRouter.get(
  "/",
  requireAuth,
  requireRole("security_chief", "admin"),
  getAllGates
);

export default gateRouter;
