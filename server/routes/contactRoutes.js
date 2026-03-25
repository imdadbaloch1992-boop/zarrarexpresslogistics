import express from 'express';
import { getContacts, createContact } from '../controllers/contactController.js';

const router = express.Router();

// Get all contacts
router.get('/get', getContacts);

// Create a new contact
router.post('/create', createContact);

export default router;