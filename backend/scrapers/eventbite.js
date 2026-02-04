import puppeteer from "puppeteer";
import Event from "../models/Event.js";

export const scrapeEventbrite = async (city = "sydney") => {
  const url = `https://www.eventbrite.com/d/${city}/events/`;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const events = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("section")).map(sec => ({
      title: sec.querySelector("h3")?.innerText || "",
      image: sec.querySelector("img")?.src || "",
      venue: sec.querySelector('[data-testid="location"]')?.innerText || "",
      date: sec.querySelector("time")?.getAttribute("datetime") || null,

      originalUrl: sec.querySelector("a")?.href || ""
    })).filter(e => e.title && e.image);
  });

  await browser.close();

  await Event.deleteMany({ source: "Eventbrite" });

  await Event.insertMany(
    events.map(e => ({
      ...e,
      source: "Eventbrite",
      city,
      status: "new",
        date: e.date ? new Date(e.date) : null,
      lastScrapedAt: new Date()
    }))
  );

  return events;
};




// import axios from "axios";
// import* as cheerio from "cheerio";
// import Event from "../models/Event.js";

// export const scrapeEventbrite = async (city = "sydney") => {
//   try {
//     const url = `https://www.eventbrite.com/d/${city}/events/`;

//     const { data } = await axios.get(url, {
//       headers: {
//         "User-Agent": "Mozilla/5.0"
//       }
//     });

//     const $ = cheerio.load(data);
//     const events = [];

//      $("a.event-card-link").each((i, el) => {
//       const title = $(el).find("h3").text().trim();
//     const date = $(el).find("time").text().trim();
//       const venue = $(el)
//         .find("[data-testid='location']")
//         .text()
//         .trim();

//    const image =
//     $(el).find("img").attr("data-src") ||
//     $(el).find("img").attr("data-original") ||
//     $(el).find("img").attr("src")||"";
//       const originalUrl  = "https://www.eventbrite.com" + $(el).attr("href");

//       if (title) {
//         events.push({
//           title,
//        date,
//           venue,
//           image,
//            originalUrl,
//            source: "Eventbrite",
//              status: "new",
           
//         });
//       }
//     });


   
//       await Event.deleteMany({ });
//       await Event.insertMany(events);
  

//     return events;
//   } catch (error) {
//     console.error("❌ Scraping Error:", error.message);
//     return [];
//   }
// };

