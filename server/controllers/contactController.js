import Contact from '../models/contactModel.js';

// GET all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new contact
export const createContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      companyName,
      collectionPostcode,
      requirements,
      message,
    } = req.body;

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      mobileNumber,
      companyName,
      collectionPostcode,
      requirements,
      message,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};