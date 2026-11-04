import eventModel from "../models/eventModel.js";

export const createEvent = async (req, res) => {
  try {
    const { title, date, location } = req.body;

    // organizer now comes from token, not body!
    const organizer = req.user.id;

    // Optional: check role
    if (req.user.role !== "organizer" && req.user.role !== "both") {
      return res.status(403).json({ message: "Only organizers can create events" });
    }

    const event = await eventModel.create({
      title,
      date,
      location,
      organizer, // auto from req.user.id
    });

    res.status(201).json({ message: "Event created", data: event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.find().populate("organizer", "name email role");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};