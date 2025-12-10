import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import authVerify from './middlewares/authVerify.js';
import uploadRoute from './uploads/upload.js';
import chatRoute from "./routes/chat.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Mongo error:', err));


app.use('/uploads', express.static('uploads'));


app.use('/upload', uploadRoute);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.use('/api/chat', chatRoute);


app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads/pdfs", filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.log("❌ Lỗi tải file:", err);
      return res.status(404).send("File không tồn tại");
    }
  });
});

// Test server
app.get('/', (req, res) => {
  res.send('Server running');
});

// Protected route
app.get('/protected', authVerify, (req, res) => {
  res.json({ message: 'Bạn đã vào route protected', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
