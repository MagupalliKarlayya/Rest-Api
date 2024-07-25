// keep-alive.js
const cron = require("node-cron");
const axios = require("axios");

// Replace with your URL
const keepAliveUrl = "https://foodfantacy-app.netlify.app/";

// Schedule the script to run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    await axios.get(keepAliveUrl);
    console.log(`Keep-Alive request sent to ${keepAliveUrl}`);
  } catch (error) {
    console.error(`Error sending Keep-Alive request: ${error.message}`);
  }
});

console.log("Keep-Alive script is running...");
