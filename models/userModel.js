import mongoose from "mongoose";
const userShema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: { type: String, enum: ["attendee", "organizer", "both"], default: "attendee" },
    password: {type: String, required: true}
}, {timestamps: true})

const userModel = mongoose.model("User", userShema)
export default userModel