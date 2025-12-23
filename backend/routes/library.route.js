import express from "express";
import isAdmin from "../middleware/isAdmin.js";
import mockRequireAuth from "../middleware/mockRequireAuth.js";
import {
  createLibrary,
  getLibraries,
  updateLibrary,
  deleteLibrary,
} from "../controllers/library.controller.js";

const libraryRouter = express.Router();

libraryRouter.post("/create", mockRequireAuth, isAdmin, createLibrary);
libraryRouter.get("/all", mockRequireAuth, isAdmin, getLibraries);
libraryRouter.put("/update/:id", mockRequireAuth, isAdmin, updateLibrary);
libraryRouter.delete("/delete/:id", mockRequireAuth, isAdmin, deleteLibrary);

export default libraryRouter;
