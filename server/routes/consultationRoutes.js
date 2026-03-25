import express from 'express';
import { getConsultations, createConsultation } from '../controllers/consultationController.js';
const router = express.Router();

router.get('/take', getConsultations);
router.post('/create', createConsultation);

export default router;
// const express = require("express");
// const router = express.Router();
// const nodemailer = require("nodemailer");

// // POST /api/consultation/create
// router.post("/create", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   // Configure transporter
//   let transporter = nodemailer.createTransport({
//     service: "gmail", // e.g., Gmail
//     auth: {
//       user: "rk8491830@gmail.com",
//       pass: "freadimckdlofqxw", // Use App Password for Gmail
//     },
//   });

//   let mailOptions = {
//     from: email,
//     to: "your-email@gmail.com", // where you want to receive queries
//     subject: `New Vehicle Consultation Request from ${name}`,
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Enquiry sent successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to send enquiry" });
//   }
// });

// module.exports = router;



// import nodemailer from "nodemailer";

// export const createConsultation = async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "rk8491830@gmail.com",
//         pass: "freadimckdlofqxw",
//       },
//     });

//     let mailOptions = {
//       from: "rk8491830@gmail.com", // must be your gmail
//       to: "rk8491830@gmail.com",   // where you receive email
//       subject: `New Vehicle Consultation from ${name}`,
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "Enquiry sent successfully" });

//   } catch (error) {
//     console.error("Email Error:", error);
//     res.status(500).json({ error: "Failed to send enquiry" });
//   }
// };