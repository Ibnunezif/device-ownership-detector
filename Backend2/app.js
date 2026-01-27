import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import authRoutes from "./modules/auth/auth.routes.js";
import deviceRoutes from "./modules/devices/device.routes.js";
import scanRoutes from "./modules/devices/scan.routes.js";
import deviceStatusRoutes from "./modules/devices/device.status.routes.js";
import logRoutes from "./modules/logs/log.routes.js";
import deviceAdminRoutes from "./modules/devices/device.admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);

app.use("/api/devices", scanRoutes);

app.use("/api/devices", deviceStatusRoutes);   

app.use("/api/logs", logRoutes);

app.use("/api/admin/devices", deviceAdminRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Smart PC Backend is running 🚀");
});

export default app;
