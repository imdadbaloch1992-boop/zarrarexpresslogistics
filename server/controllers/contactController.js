import nodemailer from 'nodemailer';
import Contact from '../models/contactModel.js';
import dns from 'node:dns';

// GET all contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

dns.setDefaultResultOrder('ipv4first');
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

    // 1. Setup Hostinger Transporter FIRST
    // We define this at the top of the function so it's ready to use
    const transporter = nodemailer.createTransport({
      host: "172.65.255.143",
      port: 465,
      secure: true, // Must be false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,   // 30 seconds
      socketTimeout: 30000,
      tls: {
        rejectUnauthorized: false // Bypasses certificate/timeout issues on Render
      },
      
    });

    // 2. Save to MongoDB
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

    // 3. Define Professional Email Content
    const mailOptions = {
      from: `"Website Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      replyTo: email,
      subject: `🚚 New Lead: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0f172a; color: white; padding: 20px; text-align: center;">
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
            <p style="background-color: #f8fafc; padding: 15px; border-radius: 4px; border-left: 4px solid #10b981;">
              ${message}
            </p>
          </div>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            This inquiry was sent from your website and has been securely saved to your database.
          </div>
        </div>
      `,
    };

    // 4. Send the Email (Now transporter is definitely initialized)
    await transporter.sendMail(mailOptions);

    // 5. Success Response
    res.status(201).json({ 
      success: true, 
      message: "Inquiry received and email sent!", 
      data: newContact 
    });

  } catch (err) {
    console.error("Error in createContact:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};