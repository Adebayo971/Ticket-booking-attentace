import eventModel from "../models/eventModel.js";

export const createEvent = async (req, res) => {
  try {
    const { title, date, location, organizer } = req.body;
    const event = await eventModel.create({ title, date, location, organizer });
    res.status(201).json({ message: "Event created", data: event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEvent = async (req, res) => {
  try {
    const getAll = await eventModel.find().populate("organizer");
    res.status(200).json({ message: "Event fetch successful", data: getAll });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

