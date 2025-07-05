// @ts-nocheck

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import noticeRoutes from "./routes/noticeRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import tenderRoutes from "./routes/tenderRoutes.js";
import tenderSubmissionRoutes from "./routes/tenderSubmissionRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://mahalaxmivihar.netlify.app",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/notices", noticeRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tenders", tenderRoutes);
app.use("/api/tender-submissions", tenderSubmissionRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err));
