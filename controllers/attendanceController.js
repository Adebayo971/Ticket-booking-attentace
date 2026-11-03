import crypto from "crypto";
import ticketModel from "../models/ticketModel.js";

export const createTicket = async (req, res) => {
  try {
    const { eventId, attendeeId } = req.body;
    const autoId = "TKT-" + crypto.randomBytes(3).toString("hex").toUpperCase();
    const ticket = await ticketModel.create({
      ticketId: autoId,
      qrCode: autoId,
      event: eventId,
      attendee: attendeeId,
    });
    res.status(201).json({
      message: "Ticket created successful",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// validation
export const validateTicket = async (req, res) => {
  try {
    const { qrCode, eventId } = req.body;
    const ticket = await ticketModel.findOne({ qrCode }).populate("event attendee");

    if (!ticket) {
      return res.status(404).json({ message: "Event not found / Fake ticket" });
    }

    if (ticket.event._id.toString() !== eventId) {
      return res.status(400).json({ message: "Invalid ticket - not for this event" });
    }

    if (ticket.status === "used") {
      return res.status(400).json({ message: `Ticket already used at ${ticket.validatedAt}` });
    }

    ticket.status = "used";
    ticket.validatedAt = new Date();
    await ticket.save();

    res.status(200).json({
      message: `Checked-in successful - ${ticket.attendee.email}`,
      data: ticket
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAttendanceList = async (req, res) => {
  try {
    const { eventId } = req.params;
    const tickets = await ticketModel.find({ event: eventId }).populate("attendee");

    const total = tickets.length;
    const checkedIn = tickets.filter(t => t.status === "used").length;

    res.status(200).json({
      message: "Attendance list",
      totalTickets: total,
      checkedIn: checkedIn,
      remaining: total - checkedIn,
      data: tickets
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};