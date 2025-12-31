import express from "express";
import {registerDevice,deviceUpdate,getAllDevices,getMyDevices,deleteDevice,getDataForPDF} from "../controllers/device.controller.js";
import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";
import upload from "../middleware/multer.js";
import {multerErrorHandler} from "../middleware/multerErrorHandler.js";


const deviceRouter = express.Router();

deviceRouter.post(
  "/register",
   requireAuth,
  upload.single("device_photo"),
  multerErrorHandler,
  registerDevice
);

deviceRouter.patch(
  "/update/:id",
  requireAuth,
  requireRole("security_chief"),
  upload.single("device_photo"),
  multerErrorHandler,
  deviceUpdate,
);

deviceRouter.get("/", requireAuth, requireRole("security_chief","security_staff"), getAllDevices);

deviceRouter.get("/my-devices", requireAuth, getMyDevices);

deviceRouter.get('/data-for-pdf/:id', requireAuth, requireRole("security_chief"),getDataForPDF);

deviceRouter.delete("/:id", requireAuth, requireRole("security_chief"), deleteDevice,multerErrorHandler);



export default deviceRouter;
