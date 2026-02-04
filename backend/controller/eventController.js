import Event from "../models/Event.js";
import { scrapeEventbrite } from "../scrapers/eventbite.js";

export const fetchEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const scrapeEvents = async (req, res) => {
  const city = req.query.city || "delhi";
  const events = await scrapeEventbrite(city);
  res.json({ count: events.length, events });
};


export const importEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = "imported";
    await event.save();

    res.json({ message: "Event imported successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Import failed" });
  }
};
export const getEvents = async (req, res) => {
  try {
    const { city, keyword, startDate, endDate } = req.query;

    let query = {};

    if (city) {
      query.city = new RegExp(`^${city}$`, "i");
    }

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const events = await Event.find(query).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};
