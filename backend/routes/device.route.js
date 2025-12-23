import express from "express";
import {
  registerDevice,
  approveDevice,
} from "../controllers/device.controller.js";
import mockStudentAuth from "../middleware/mockRequireAuth.js";
import upload from "../middleware/multer.js";
import mockRequireAuth from "../middleware/mockRequireAuth.js";

const deviceRouter = express.Router();

deviceRouter.post(
  "/register",
  mockStudentAuth,
  upload.single("device_photo"),
  registerDevice
);

deviceRouter.post("/approve/:deviceId", mockRequireAuth, approveDevice);

export default deviceRouter;
