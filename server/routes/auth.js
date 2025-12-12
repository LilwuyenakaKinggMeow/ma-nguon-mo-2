import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

/* ==========================================
    🔥 API đăng ký – mặc định role = "user"
========================================== */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: 'Email đã tồn tại' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      passwordHash,
      role: "user" // 🔥 thêm rõ ràng
    });

    await user.save();

    res.json({ message: 'Đăng ký thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* ==========================================
    🔥 API đăng nhập – trả về role
========================================== */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Email không đúng' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: 'Mật khẩu không đúng' });

    const token = jwt.sign(
      { id: user._id, role: user.role },   // 🔥 thêm role vào token
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role // 🔥 frontend cần biết để hiển thị giao diện admin
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* ==========================================
    🔥 API tạo admin đầu tiên (tạm thời)
========================================== */
router.post('/create-admin-secret', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Không cho tạo nếu đã có admin trong DB
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists)
      return res.status(400).json({ message: "Admin đã tồn tại, không thể tạo thêm bằng secret route" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email đã tồn tại rồi" });

    const hash = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      passwordHash: hash,
      role: "admin"
    });

    await admin.save();

    res.json({ message: "Tạo admin thành công!", admin });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
