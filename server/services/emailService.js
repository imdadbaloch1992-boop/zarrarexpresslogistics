import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL_USER or EMAIL_PASS missing in .env");
}

// ✅ FIXED SMTP CONFIG (NO TIMEOUT)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // important
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection error:", error);
  } else {
    console.log("✅ Email server ready");
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"AMV Couriers" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
  }
};

// owner notification
export const sendOwnerNotification = async (bookingData) => {
  try {
    const ownerEmail = process.env.OWNER_EMAIL;

    if (!ownerEmail) {
      console.warn("⚠️ OWNER_EMAIL missing in .env");
      return;
    }

    const html = `
      <h2>New Booking</h2>
      <p><b>Booking ID:</b> ${bookingData._id}</p>
      <p><b>Collection:</b> ${bookingData.collectionPostcode}</p>
      <p><b>Delivery:</b> ${bookingData.deliveryPostcode}</p>
      <p><b>Mobile Number:</b> ${bookingData.phone}</p>
      <p><b>Vehicle:</b> ${bookingData.vehicle}</p>
      <p><b>Total:</b> £${bookingData.totalPrice}</p>
      <p><b>Email:</b> ${bookingData.email}</p>
    `;

    await sendEmail(ownerEmail, "🚚 NEW BOOKING - AMV Couriers", html);

    console.log("✅ Owner notification email sent");

  } catch (error) {
    console.error("❌ Owner email failed:", error.message);
  }
};