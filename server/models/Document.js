import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
    title: String,
    description: String,
    file: String,
}, { timestamps: true });

export default mongoose.model("Document", DocumentSchema);
