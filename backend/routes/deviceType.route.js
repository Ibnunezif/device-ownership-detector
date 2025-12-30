import {
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
  getDeviceType,
  getAllDeviceTypes,
} from "../controllers/deviceTypeController.js";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";
import express from "express";
const deviceTypeRouter = express.Router();

//create device type
deviceTypeRouter.post(
  "/create",
  requireAuth,
  requireRole("security_chief","admin"),
  createDeviceType
);
//update device type
deviceTypeRouter.patch(
  "/update/:id",
  requireAuth,
  requireRole("security_chief","admin"),
  updateDeviceType
);
//delete device type
deviceTypeRouter.delete(
  "/delete/:id",
  requireAuth,
  requireRole("security_chief","admin"),
  deleteDeviceType
);
//get device type
deviceTypeRouter.get("/:id",requireAuth, getDeviceType);

//get all device types
deviceTypeRouter.get("/",requireAuth,getAllDeviceTypes);

export default deviceTypeRouter;
