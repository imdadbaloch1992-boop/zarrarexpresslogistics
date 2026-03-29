import nodemailer from 'nodemailer';
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

// POST a new contact (Saves to DB + Sends Email)
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

    // 1. Save to MongoDB
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

    // 2. Setup Hostinger Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT, // 465
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Define Professional Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      replyTo: email,
      subject: `🚚 New Contact Form: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #22c55e; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Lead Received</h1>
          </div>
          <div style="padding: 20px; color: #334155;">
            <p><strong>Customer Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${mobileNumber}</p>
            <p><strong>Company:</strong> ${companyName || 'N/A'}</p>
            <p><strong>Collection Postcode:</strong> ${collectionPostcode}</p>
            <p><strong>Requirements:</strong> ${requirements}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="background-color: #f8fafc; padding: 15px; border-radius: 4px; border-left: 4px solid #22c55e;">
              ${message}
            </p>
          </div>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            This inquiry was sent from the AMV Couriers contact form and has been saved to your database.
          </div>
        </div>
      `,
    };

    // 4. Send the Email
    await transporter.sendMail(mailOptions);
    // 2. Setup Hostinger Transporter (Updated for Cloud Reliability)
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com", // Hardcoding this for a second to rule out .env issues
      port: 587,                  // Changed from 465 to 587
      secure: false,              // Must be false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // This helps bypass timeout/handshake issues on Render
      },
      connectionTimeout: 10000, // 10 seconds
    });

    // 5. Success Response
    res.status(201).json({ 
      success: true, 
      message: "Inquiry received and email sent!", 
      data: newContact 
    });

  } catch (err) {
    console.error("Error in createContact:", err);
    res.status(400).json({ error: err.message });
  }
};