import express from "express";
import {
  registerDevice,
  approveDevice,
  flagDeviceStatus,
  getFlaggedDevices,
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

// Flag device as stolen (security_chief only)
deviceRouter.post("/flag/:id", mockRequireAuth, flagDeviceStatus);

// List flagged devices (security_staff & security_chief)
deviceRouter.get("/flagged", mockRequireAuth, getFlaggedDevices);

export default deviceRouter;
