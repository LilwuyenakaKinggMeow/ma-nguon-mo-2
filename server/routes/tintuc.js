import express from "express";
import multer from "multer";
import News from "../models/News.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/tintuc"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await News.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Bài viết không tồn tại" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, summary, category } = req.body;

        const newPost = new News({
            title,
            summary,
            category,
            author: "Admin",
            date: new Date().toLocaleDateString("vi-VN"),
            image: req.file
                ? `${req.protocol}://${req.get("host")}/${req.file.path}`
                : null
        });

        await newPost.save();
        res.json({ message: "Đăng bài thành công!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const { title, summary, category } = req.body;

        const updateData = { title, summary, category };

        if (req.file) {
            updateData.image =
                `${req.protocol}://${req.get("host")}/${req.file.path}`;
        }

        const updatedPost = await News.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedPost) return res.status(404).json({ message: "Bài viết không tồn tại" });

        res.json({ message: "Cập nhật thành công!", post: updatedPost });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: "Đã xóa bài viết" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
