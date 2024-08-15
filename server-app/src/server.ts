import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import shortUrl from "./routes/shortUrl";
import { rateLimit } from "express-rate-limit";
dotenv.config();
connectDB();

const port = process.env.PORT || 5001;
const app = express();
app.use(cors());

//configure rate limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: "draft-7", 
  legacyHeaders: false, 
  message: "Too many request from this IP. Please try again after 15 minutes.",
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/api/", shortUrl);

// APP listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
