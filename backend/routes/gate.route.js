import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import mockRequireAuth from "../middleware/mockRequireAuth.js";
import {
  createGate,
  getGates,
  updateGate,
  deleteGate,
} from "../controllers/gate.controller.js";

const gateRouter = express.Router();

gateRouter.post("/create", mockRequireAuth, isAdmin, createGate);
gateRouter.get("/all", mockRequireAuth, isAdmin, getGates);
gateRouter.put("/update/:id", mockRequireAuth, isAdmin, updateGate);
gateRouter.delete("/delete/:id", mockRequireAuth, isAdmin, deleteGate);

export default gateRouter;
