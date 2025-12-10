import express from 'express';
import User from '../models/User.js';
import authVerify from '../middlewares/authVerify.js';

const router = express.Router();

// Lấy toàn bộ user
router.get('/', async (req, res) => {
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

// Lấy user hiện tại
router.get('/me', authVerify, async (req, res) => {
  const user = await User.findById(req.userId).select('-passwordHash');
  res.json(user);
});

export default router;
