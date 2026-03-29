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
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
const app = express();

// Fix __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug environment (Keep these for troubleshooting)
console.log('--- Environment Check ---');
console.log('PORT =', process.env.PORT);
console.log('MONGO_URI =', process.env.MONGO_URI ? 'FOUND' : 'NOT FOUND');
console.log('EMAIL_USER =', process.env.EMAIL_USER ? 'FOUND' : 'NOT FOUND');
console.log('EMAIL_HOST =', process.env.EMAIL_HOST || 'NOT FOUND');
console.log('------------------------');

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes); // This is where our email logic lives
app.use('/api/consultation', consultationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/stripe", stripeRoutes);

// ✅ SERVE FRONTEND (Production Fix)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Handle React Routing (must be AFTER API routes)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));