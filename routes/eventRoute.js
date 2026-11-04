import express from "express";
import { createEvent, getAllEvents } from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createEvent);
router.get("/get-all-event", getAllEvents);

export default router;