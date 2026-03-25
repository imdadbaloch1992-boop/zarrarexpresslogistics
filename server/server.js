import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import stripeRoutes from "./routes/stripeRoutes.js";
import contactRoutes from './routes/contactRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

// Fix __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug environment
console.log('PORT =', process.env.PORT);
console.log('MONGO_URI =', process.env.MONGO_URI ? 'FOUND' : 'NOT FOUND');
console.log('EMAIL_USER =', process.env.EMAIL_USER ? 'FOUND' : 'NOT FOUND');
console.log('EMAIL_PASS =', process.env.EMAIL_PASS ? 'FOUND' : 'NOT FOUND');
console.log('OWNER_EMAIL =', process.env.OWNER_EMAIL ? 'FOUND' : 'NOT FOUND');

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/consultation', consultationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/stripe", stripeRoutes);

// ✅ SERVE FRONTEND (FIX FOR "Cannot GET /")
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));