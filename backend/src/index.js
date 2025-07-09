import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

// .env faylini yuklash
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB ulanishi
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB ulanishi muvaffaqiyatli'))
.catch((err) => console.error('MongoDB ulanishida xatolik:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Futurecoin backend ishlayapti!');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti`);
}); 