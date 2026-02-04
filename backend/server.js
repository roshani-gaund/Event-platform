import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { startEventScraperCron } from "./cron/scrapejob.js";
import eventRoute from "./routes/eventRoutes.js";


dotenv.config();
const app = express();

app.use(cors(
  { origin: ["https://event-platform-ecru-gamma.vercel.app", "http://localhost:5173"],
    credentials: true
     }
));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
await startEventScraperCron();
app.use("/api/events", eventRoute);

app.use("/api/auth", (await import("./routes/authRoutes.js")).default);
app.use("/api/leads", (await import("./routes/leadRouter.js")).default);

app.listen(5000, () => console.log("Server running on 5000"));
