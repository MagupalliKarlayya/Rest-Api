import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import cors from "cors";
import axios from "axios";

// Use CORS middleware

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve JSON data
app.get("/api/swiggy", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});

app.get("/proxy/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.27060&lng=85.83340&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "application/json",
        Origin: "https://foodfantacy-app.netlify.app", // Update to your frontend URL
        Referer: "https://foodfantacy-app.netlify.app/", // Update to your frontend URL
        Cookie:
          "__SW=B0cr6coHexQmPKFtchrC9UQdSISzZkMr; _guest_tid=15abc32d-9564-4dd3-a1dc-0aa9b6060d3b; _device_id=5412fbe1-aa77-a399-c3a2-5bc68132bffc; _sid=f36f1aaa-4b4f-4501-bc60-b11ce5ab687d",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send(`Error fetching data: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
