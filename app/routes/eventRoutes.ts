import { Router } from "express";
import {
  addEvent,
  deleteEvent,
  getEventById,
  listEvents,
  updateEvent,
} from "../controllers/eventController";

const router = Router();

//route to add an event 
router.post("/event", addEvent);

//route to update an event
router.put("/event/:id", updateEvent);

//route to delete an event
router.delete("/event/:id", deleteEvent);

//route to get single event by id
router.get("/event/:id", getEventById);

//route to lists all events
router.get("/events", listEvents);

export default router;
