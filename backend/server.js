import express from "express";
import cors from "cors";
import connectToDB from "./config/mongoDB.js";
import "dotenv/config";
import deviceRouter from "./routes/device.route.js";
import gateRouter from "./routes/gate.route.js";
import libraryRouter from "./routes/library.route.js";

// express app config
const app = express();
const PORT = process.env.PORT || 3000; // fallback port

// DB connection
connectToDB();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://workout-frontend-h22n.onrender.com", // your deployed frontend URL
    credentials: true,
  })
);

// basic route to test server
app.get("/", (req, res) => {
  res.send("API is working .. ");
});

// api routes
app.use("/api/devices", deviceRouter);
app.use("/api/gates", gateRouter);
app.use("/api/libraries", libraryRouter);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
