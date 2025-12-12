import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
    {
        title: String,
        summary: String,
        category: String,
        author: { type: String, default: "Admin" },
        date: String,
        image: String
    },
    { timestamps: true }
);

export default mongoose.model("News", NewsSchema);
