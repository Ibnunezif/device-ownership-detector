import express from "express";
import registerDevice from "../controllers/device.controller.js";
import requireAuth from "../middleware/requireAuth.js";
import upload from "../middleware/multer.js";

const deviceRouter = express.Router();

deviceRouter.post(
  "/register",
   requireAuth,
  upload.single("device_photo"),
  registerDevice
);

export default deviceRouter;
