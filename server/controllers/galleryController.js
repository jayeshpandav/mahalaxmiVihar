import Gallery from "../models/Gallery.js";

/**
 * @desc Upload a new gallery image
 * @route POST /api/gallery/upload
 */
export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newImage = new Gallery({
      caption: req.body.caption,
      fileUrl: req.file.path, // was imageUrl
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    console.error("Gallery Upload Error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

/**
 * @desc Get all gallery images
 * @route GET /api/gallery
 */
export const getAllGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("Fetch Gallery Error:", err);
    res.status(500).json({ error: "Failed to fetch gallery images" });
  }
};
