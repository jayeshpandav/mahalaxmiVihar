import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    fileUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
