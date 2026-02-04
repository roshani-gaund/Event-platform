import cron from "node-cron";
import { scrapeEventbrite } from "../scrapers/eventbite.js";

export const startEventScraperCron = () => {
  // ⏰ Every day at 2 AM
  cron.schedule("0 2 * * *", async () => {
    console.log("⏳ Auto scraping started...");

    try {
      await scrapeEventbrite("delhi");
      await scrapeEventbrite("mumbai");
      await scrapeEventbrite("bangalore");

      console.log("✅ Auto scraping completed");
    } catch (err) {
      console.error("❌ Auto scraping failed:", err.message);
    }
  });
};
