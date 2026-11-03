import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    qrCode: { type: String, required: true, unique: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    attendee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["valid", "used"], default: "valid" },
    validatedAt: { type: Date }
}, { timestamps: true });

const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;