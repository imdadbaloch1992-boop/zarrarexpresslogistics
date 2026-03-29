import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe'; // Added Stripe import for the webhook logic

import connectDB from './config/db.js';
import stripeRoutes from "./routes/stripeRoutes.js";
import contactRoutes from './routes/contactRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Fix __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debug environment
console.log('--- Environment Check ---');
console.log('PORT =', process.env.PORT);
console.log('MONGO_URI =', process.env.MONGO_URI ? 'FOUND' : 'NOT FOUND');
console.log('STRIPE_WEBHOOK_SECRET =', process.env.STRIPE_WEBHOOK_SECRET ? 'FOUND' : 'NOT FOUND');
console.log('------------------------');

// Connect database
connectDB();

// --- MIDDLEWARE ---
app.use(cors());

/** * ✅ STRIPE WEBHOOK ROUTE 
 * This MUST stay above express.json() to work.
 * It matches your Stripe Dashboard URL: https://zarrarexpresslogistics.co.uk/api/webhooks/stripe
 */
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`❌ Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the specific event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('💰 Payment Successful for:', session.customer_details.email);
        // Add your logic here (e.g., update database, send booking email)
    }

    res.json({ received: true });
});

// Now we can use JSON for all other routes
app.use(express.json());

// --- API ROUTES ---
app.use('/api/contact', contactRoutes);
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