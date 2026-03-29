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

    // 1. Save to MongoDB
    const newContact = new Contact({
      firstName, lastName, email, mobileNumber, 
      companyName, collectionPostcode, requirements, message 
    });
    await newContact.save();

    // 2. Send via Resend API (Now using your VERIFIED domain!)
    const { data, error } = await resend.emails.send({
      // ✅ CHANGED: Using your official business email
      from: 'Zarrar Logistics <support@zarrarexpresslogistics.co.uk>', 
      // ✅ FIXED: Sending to your OWNER_EMAIL set in Render
      to: process.env.OWNER_EMAIL,
      // ✅ ADDED: This lets you click "Reply" in your email to message the customer directly
      reply_to: email,
      subject: `🚚 New Lead: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0f172a;">New Contact Form Submission</h2>
          <hr />
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${mobileNumber}</p>
          <p><strong>Postcode:</strong> ${collectionPostcode}</p>
          <p><strong>Service:</strong> ${requirements}</p>
          <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 5px; border-left: 4px solid #22c55e;">
            ${message}
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            This lead was captured via your website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      // If Resend returns an error (like an invalid API key), this catches it
      throw new Error(error.message);
    }

    res.status(201).json({ 
      success: true, 
      message: "Lead saved and email sent successfully!" 
    });

  } catch (err) {
    console.error("Resend Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};