import express from "express";
import authVerify from "../middlewares/authVerify.js";
import checkAdmin from "../middlewares/checkAdmin.js";
import Document from "../models/Document.js";
import News from "../models/News.js";

const router = express.Router();

// Tạo tài liệu
router.post("/documents", authVerify, checkAdmin, async (req, res) => {
    try {
        const doc = new Document(req.body);
        await doc.save();
        res.json({ message: "Tạo tài liệu thành công", doc });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy danh sách tài liệu
router.get("/documents", authVerify, checkAdmin, async (req, res) => {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
});

// Sửa tài liệu
router.put("/documents/:id", authVerify, checkAdmin, async (req, res) => {
    const updated = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Xóa tài liệu
router.delete("/documents/:id", authVerify, checkAdmin, async (req, res) => {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa tài liệu" });
});

/* ---------------------- NEWS CRUD ---------------------------- */

// Đăng tin tức
router.post("/news", authVerify, checkAdmin, async (req, res) => {
    try {
        const post = new News(req.body);
        await post.save();
        res.json({ message: "Đăng tin thành công", post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy danh sách tin tức
router.get("/news", authVerify, checkAdmin, async (req, res) => {
    const posts = await News.find().sort({ createdAt: -1 });
    res.json(posts);
});

// Sửa tin
router.put("/news/:id", authVerify, checkAdmin, async (req, res) => {
    const updated = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Xóa tin
router.delete("/news/:id", authVerify, checkAdmin, async (req, res) => {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa tin" });
});

export default router;
