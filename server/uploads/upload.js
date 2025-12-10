import express from "express";
import multer from "multer";

const router = express.Router();

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // link trả về
  const imageUrl = `http://${req.headers.host}/uploads/${req.file.filename}`;
  res.json({ success: true, url: imageUrl });
});

export default router;
