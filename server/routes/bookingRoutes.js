import express from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { getBookingById } from "../controllers/bookingController.js";
const router = express.Router();

router.post('/create', createBooking);
router.get("/:id", getBookingById);
export default router;