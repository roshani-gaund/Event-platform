import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  email: String,
  consent: Boolean,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);
