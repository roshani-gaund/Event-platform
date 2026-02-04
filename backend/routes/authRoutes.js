// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/google", (req, res) => {
  // Normally Google OAuth here
  // ASSIGNMENT DEMO SIMPLIFIED
  const token = jwt.sign({ role: "admin" }, "secret", {
    expiresIn: "1d",
  });

  res.redirect(
    `http://localhost:5173/dashboard?token=${token}`
  );
});

export default router;
