import Notice from "../models/Notice.js";

export const createNotice = async (req, res) => {
  try {
    const { title, date, content } = req.body;
    const fileUrl = req.file?.path || "";

    const notice = new Notice({
      title,
      date,
      content,
      fileUrl, // was imageUrl
    });

    await notice.save();
    res.status(201).json(notice);
  } catch (error) {
    console.error("Error uploading notice:", error);
    res.status(500).json({ message: "Notice upload failed" });
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ _id: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
