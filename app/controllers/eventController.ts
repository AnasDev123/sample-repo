import { Request, Response } from "express";
import Event from "../models/Event";

// Controller to add an Event
export const addEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = new Event({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

// Controller to update an Event
export const updateEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        ...req.body,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

// Controller to delete an event by id
export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (deletedEvent) {
      res.status(200).json({ message: "Event deleted" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

// Controller to get single  event by id
export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving event", error });
  }
};

// Controller to list all event with event name, organizer and date filters
export const listEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let filter: any = {};

    // Extract query parameters
    const { eventName, organizer, date } = req.query;

    if (eventName) filter.eventName = new RegExp(eventName as string, "i");
    if (organizer) filter.organizer = new RegExp(organizer as string, "i");
    if (date) {
      filter.eventDate = new Date(date as string);
    }

    // Find events that match all filter criteria
    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error listing events", error });
  }
};
