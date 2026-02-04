import express from "express";
import Lead from "../models/Lead.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, consent, eventId } = req.body;

    if (!email || !consent) {
      return res.status(400).json({ message: "Email and consent required" });
    }

    await Lead.create({ email, consent, eventId });

    res.json({ message: "Lead saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
