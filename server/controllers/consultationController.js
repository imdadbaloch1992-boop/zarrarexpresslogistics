import Consultation from '../models/consultationModel.js';

// Get all consultations
export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new consultation
// export const createConsultation = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
//     const newConsultation = new Consultation({ name, email, message });
//     await newConsultation.save();
//     res.status(201).json(newConsultation);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
import nodemailer from "nodemailer";

export const createConsultation = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rk8491830@gmail.com",
        pass: "freadimckdlofqxw",
      },
    });

    let mailOptions = {
      from: "rk8491830@gmail.com", // must be your gmail
      to: "rk8491830@gmail.com",   // where you receive email
      subject: `New Vehicle Consultation from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Enquiry sent successfully" });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send enquiry" });
  }
};