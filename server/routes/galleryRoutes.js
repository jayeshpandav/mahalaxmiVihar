import express from "express";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import {
  uploadGalleryImage,
  getAllGalleryImages,
} from "../controllers/galleryController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage });

// POST /api/gallery/upload
router.post("/upload", authenticateToken, authorizeRoles("admin"), upload.single("image"), uploadGalleryImage);

// GET /api/gallery
router.get("/", getAllGalleryImages);

export default router;
