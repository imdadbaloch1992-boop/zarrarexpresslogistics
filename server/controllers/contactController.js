import { Resend } from 'resend';
import Contact from '../models/contactModel.js';

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export const createContact = async (req, res) => {
  try {
    const { 
      firstName, lastName, email, mobileNumber, 
      companyName, collectionPostcode, requirements, message 
    } = req.body;

    // 1. Save to MongoDB (This stays the same)
    const newContact = new Contact({
      firstName, lastName, email, mobileNumber, 
      companyName, collectionPostcode, requirements, message 
    });
    await newContact.save();

    // 2. Send via Resend API (This uses HTTPS, so no more Timeout/IPv6 errors!)
    const { data, error } = await resend.emails.send({
      from: 'Zarrar Logistics <onboarding@resend.dev>', // We will use this default for now
      to: process.env.OWNER_EMAIL,
      reply_to: email,
      subject: `🚚 New Lead: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${mobileNumber}</p>
          <p><strong>Postcode:</strong> ${collectionPostcode}</p>
          <p><strong>Service:</strong> ${requirements}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</div>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    res.status(201).json({ 
      success: true, 
      message: "Lead saved and email sent via Resend!" 
    });

  } catch (err) {
    console.error("Resend Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Keep your getContacts function below if you use it
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};