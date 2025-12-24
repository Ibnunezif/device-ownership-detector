import express from "express";
import registerDevice from "../controllers/device.controller.js";
import mockStudentAuth from "../middleware/mockStudentAuth.js";
import upload from "../middleware/multer.js";

const deviceRouter = express.Router();

deviceRouter.post(
  "/register",
  mockStudentAuth,
  upload.single("device_photo"),
  registerDevice
);

export default deviceRouter;
