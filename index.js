import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./models/userModel.js"; 
import eventRoutes from "./routes/eventRoute.js";
import attendanceRoutes from "./routes/attendanceRoute.js";
import authRoutes from "./routes/authRoute.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => console.log(`Running on ${PORT}`));
  })
  .catch((err) => console.log("MongoDB fail", err.message));