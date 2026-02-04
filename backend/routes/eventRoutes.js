

import express from "express";
import { fetchEvents, scrapeEvents,importEvent,getEvents } from "../controller/eventController.js";
const router = express.Router();

router.get("/", fetchEvents);
router.get("/scrape", scrapeEvents);
router.post("/:id/import", importEvent);

router.get("/event", getEvents);

export default router;