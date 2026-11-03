import express from "express"
import {createEvent, getAllEvent} from "../controllers/eventController.js"

const router = express.Router();

router.post("/create", createEvent),
router.patch("/get-all-event", getAllEvent)

export default router