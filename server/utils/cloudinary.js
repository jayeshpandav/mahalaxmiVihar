import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "mahalaxmi_notices",
      resource_type: "auto", // ✅ support images, PDFs, etc.
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    };
  },
});

export { cloudinary, storage };
