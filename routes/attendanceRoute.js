import express from "express";
import { createTicket, validateTicket, getAttendanceList } from "../controllers/attendanceController.js"

const router = express.Router();

router.post("/create", createTicket);
router.post("/validate", validateTicket);
router.get("/event/:eventId", getAttendanceList);

export default router;