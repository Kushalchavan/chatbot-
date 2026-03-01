import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import morgan from "morgan";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://chatbot-lyart-delta-32.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
