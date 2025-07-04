import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  date: String,
  content: String,
  fileUrl: String,
});

export default mongoose.model("Notice", noticeSchema);
