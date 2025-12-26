import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";

import {
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibrary,
  getAllLibraries,
} from "../controllers/library.controller.js";

const libraryRouter = express.Router();

/* ============================
   CREATE LIBRARY
============================ */
libraryRouter.post(
  "/create",
  requireAuth,
  requireRole("security_chief", "admin"),
  createLibrary
);

/* ============================
   UPDATE LIBRARY
============================ */
libraryRouter.patch(
  "/update/:id",
  requireAuth,
  requireRole("security_chief", "admin"),
  updateLibrary
);

/* ============================
   DELETE LIBRARY
============================ */
libraryRouter.delete(
  "/delete/:id",
  requireAuth,
  requireRole("security_chief", "admin"),
  deleteLibrary
);

/* ============================
   GET SINGLE LIBRARY
============================ */
libraryRouter.get(
  "/:id",
  requireAuth,
  getLibrary
);

/* ============================
   GET ALL LIBRARIES
============================ */
libraryRouter.get(
  "/",
  requireAuth,
  requireRole("security_chief", "admin"),
  getAllLibraries
);

export default libraryRouter;
