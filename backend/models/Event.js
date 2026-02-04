// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
date: {
  type: Date,
  required: false
},

  venue: String,
  description: String,
  image: String,
  source: String,
  originalUrl: String,
  city: { type: String, default: "Sydney" },
  status: {
    type: String,
    enum: ["new", "updated", "inactive", "imported"],
    default: "new"
  },
  lastScrapedAt: Date,
  importedAt: Date,
  importedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
