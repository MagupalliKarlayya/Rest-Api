import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import cors from "cors";
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
