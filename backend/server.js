import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import workoutRoutes from './routes/workouts.js';
import userRoutes from './routes/users.js';
import deviceRouter from "./routes/device.route.js";
import deviceTypeRouter from './routes/deviceType.route.js';

// express app
const app = express();

// middleware
app.use(express.json());

// allow localhost + deployed frontend
app.use(
  cors({
    origin: [
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      'https://workout-frontend-h22n.onrender.com'
    ],
    credentials: true
  })
);

// request logger
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// routes
// app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
// api routes
app.use("/api/devices", deviceRouter);
//device types
app.use("/api/device-type", deviceTypeRouter);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.SERVER_PORT || 8080, () => {
      console.log(
        'Connected to MongoDB & listening on port',
        process.env.SERVER_PORT || 8080
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });



