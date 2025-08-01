import dotenv from "dotenv";
import express from "express";
import connectToDb from "../db/connect.db.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import journalRoutes from "./routes/journal.routes.js";
import habitRoutes from "./routes/habit.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import axios from "axios"; // ✅ for Unsplash API
import cookieParser from "cookie-parser" ;
import { verifyAccessToken } from "./middleware/userAuthMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 

// Public API Routes
app.use("/api/user", userRoutes);

// Protected API Routes
app.use("/api/journal", verifyAccessToken, journalRoutes);
app.use("/api/habit", verifyAccessToken, habitRoutes);
app.use("/api/goal", verifyAccessToken, goalRoutes);


// ✅ Unsplash Search Proxy Route
app.get("/api/unsplash-search", async (req, res) => {
  const query = req.query.query;
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return res.status(500).json({ error: "Unsplash API key not configured" });
  }

  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 9 },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Unsplash Proxy Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch images from Unsplash" });
  }
});

// Connect to DB and start server
connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connection placed : http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });
