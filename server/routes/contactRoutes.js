import express from 'express';
import { getContacts, createContact } from '../controllers/contactController.js';

const router = express.Router();

// Get all contacts (for your admin dashboard later)
router.get('/get', getContacts);

// Create a new contact (This will now send the email)
router.post('/create', createContact);

export default router;