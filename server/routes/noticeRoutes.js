import express from "express";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import { createNotice, getNotices } from "../controllers/noticeController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/upload", authenticateToken, authorizeRoles("admin"), upload.single("file"), createNotice); // ✅ changed from 'image' to 'file'
router.get("/", getNotices);

export default router;
