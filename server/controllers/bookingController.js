import Booking from '../models/Booking.js';
import { getDistanceInMiles } from '../services/distanceService.js';
import nodemailer from 'nodemailer';
import { sendOwnerNotification } from "../services/emailService.js";
// Define all extra services in a single object for scalability
const EXTRA_CHARGES = {
  "Out Of Hours": { type: "perMile", value: 0.30 },
  "Congestion Charge": { type: "flat", value: 15 },
  "ULEZ Charge": { type: "flat", value: 12 },
};


export const createBooking = async (req, res) => {
  try {
    const {
      collectionPostcode,
      deliveryPostcode,
      vehicle,
      pricePerMile,
      minCharge,
      extraServices = [],
      sendEmail,
      email,
      phone
    } = req.body;

    // 1️⃣ Basic validation
    if (!collectionPostcode || !deliveryPostcode || !vehicle || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking fields"
      });
    }

    const basePricePerMile = Number(pricePerMile);
    const minimumCharge = Number(minCharge);

    if (isNaN(basePricePerMile) || isNaN(minimumCharge)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pricing data"
      });
    }

    // 2️⃣ Get distance safely
    const miles = await getDistanceInMiles(collectionPostcode, deliveryPostcode);

    if (!miles || isNaN(miles)) {
      return res.status(400).json({
        success: false,
        message: "Distance calculation failed"
      });
    }

    // 3️⃣ Calculate total price dynamically with extra services
    let ratePerMile = basePricePerMile;
    let totalExtraCharges = 0;

    extraServices.forEach(service => {
      const charge = EXTRA_CHARGES[service];
      if (charge) {
        if (charge.type === "perMile") ratePerMile += charge.value;
        else if (charge.type === "flat") totalExtraCharges += charge.value;
      }
    });

    const distanceCharge = ratePerMile * miles;
    let totalPrice = distanceCharge + totalExtraCharges;
    totalPrice = Math.max(totalPrice, minimumCharge);
    totalPrice = Number(totalPrice.toFixed(2));

    if (isNaN(totalPrice)) {
      return res.status(400).json({
        success: false,
        message: "Final price calculation failed"
      });
    }

    // 4️⃣ Save booking to DB
    const booking = await Booking.create({
      collectionPostcode,
      deliveryPostcode,
      phone,
      vehicle,
      pricePerMile: basePricePerMile,
      minCharge: minimumCharge,
      extraServices,
      miles,
      distanceCharge: Number(distanceCharge.toFixed(2)),
      totalExtraCharges: Number(totalExtraCharges.toFixed(2)),
      totalPrice,
      email,
      sendEmail: Boolean(sendEmail)
    });

    // 5️⃣ Send OWNER notification email automatically
    try {
      await sendOwnerNotification(booking);
      console.log("✅ Owner notification email sent");
    } catch (error) {
      console.error("❌ Owner email failed:", error.message);
    }

    // 6️⃣ Send customer email (optional)
    if (sendEmail && email) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your Transport Quote",
          html: `
            <h2>Quote Details</h2>
            <p><strong>Vehicle:</strong> ${vehicle}</p>
            <p><strong>Miles:</strong> ${miles}</p>
            <p><strong>Base Price per Mile:</strong> £${basePricePerMile}</p>
            <p><strong>Distance Charge:</strong> £${distanceCharge.toFixed(2)}</p>
            <p><strong>Extra Services:</strong> ${extraServices.join(", ") || "None"}</p>
            <p><strong>Total Extra Charges:</strong> £${totalExtraCharges.toFixed(2)}</p>
            <p><strong>Total Price:</strong> £${totalPrice}</p>
          `
        });


 
        console.log("✅ Customer email sent successfully!");
      } catch (emailError) {
        console.error("❌ Customer email sending failed:", emailError.message);
      }
    }

    // 7️⃣ Response
    res.status(201).json({
      success: true,
      data: {
        bookingId: booking._id,
        miles,
        distanceCharge: Number(distanceCharge.toFixed(2)),
        totalExtraCharges: Number(totalExtraCharges.toFixed(2)),
        totalPrice
      }
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating booking"
    });
  }
};

// export const createBooking = async (req, res) => {
//   try {
//     const {
//       collectionPostcode,
//       deliveryPostcode,
//       vehicle,
//       pricePerMile,
//       minCharge,
//       extraServices = [],
//       sendEmail,
//       email
//     } = req.body;

//     // 1️⃣ Basic validation
//     if (!collectionPostcode || !deliveryPostcode || !vehicle) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required booking fields"
//       });
//     }

//     const basePricePerMile = Number(pricePerMile);
//     const minimumCharge = Number(minCharge);

//     if (isNaN(basePricePerMile) || isNaN(minimumCharge)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid pricing data"
//       });
//     }

//     // 2️⃣ Get distance safely
//     const miles = await getDistanceInMiles(collectionPostcode, deliveryPostcode);

//     if (!miles || isNaN(miles)) {
//       return res.status(400).json({
//         success: false,
//         message: "Distance calculation failed"
//       });
//     }

//     // 3️⃣ Calculate total price dynamically with extra services
//     let ratePerMile = basePricePerMile;
//     let totalExtraCharges = 0;

//     extraServices.forEach(service => {
//       const charge = EXTRA_CHARGES[service];
//       if (charge) {
//         if (charge.type === "perMile") ratePerMile += charge.value;
//         else if (charge.type === "flat") totalExtraCharges += charge.value;
//       }
//     });

//     const distanceCharge = ratePerMile * miles;
//     let totalPrice = distanceCharge + totalExtraCharges;

//     // Apply minimum charge
//     totalPrice = Math.max(totalPrice, minimumCharge);
//     totalPrice = Number(totalPrice.toFixed(2));

//     if (isNaN(totalPrice)) {
//       return res.status(400).json({
//         success: false,
//         message: "Final price calculation failed"
//       });
//     }

//     // 4️⃣ Save booking to DB
//     const booking = await Booking.create({
//       collectionPostcode,
//       deliveryPostcode,
//       vehicle,
//       pricePerMile: basePricePerMile,
//       minCharge: minimumCharge,
//       extraServices,
//       miles,
//       distanceCharge: Number(distanceCharge.toFixed(2)),
//       totalExtraCharges: Number(totalExtraCharges.toFixed(2)),
//       totalPrice,
//       email,
//       sendEmail: Boolean(sendEmail)
//     });

//     // 5️⃣ Send email (optional)
//     if (sendEmail && email) {
//       try {
//         const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//           }
//         });

//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: email,
//           subject: 'Your Transport Quote',
//           html: `
//             <h2>Quote Details</h2>
//             <p><strong>Vehicle:</strong> ${vehicle}</p>
//             <p><strong>Miles:</strong> ${miles}</p>
//             <p><strong>Base Price per Mile:</strong> £${basePricePerMile}</p>
//             <p><strong>Distance Charge:</strong> £${distanceCharge.toFixed(2)}</p>
//             <p><strong>Extra Services:</strong> ${extraServices.join(', ') || 'None'}</p>
//             <p><strong>Total Extra Charges:</strong> £${totalExtraCharges.toFixed(2)}</p>
//             <p><strong>Total Price:</strong> £${totalPrice}</p>
//           `
//         });

//         console.log('Email sent successfully!');
//       } catch (emailError) {
//         console.error('Email sending failed:', emailError.message);
//       }
//     }

//     // 6️⃣ Response
//     res.status(201).json({
//       success: true,
//       data: {
//         bookingId: booking._id,
//         miles,
//         distanceCharge: Number(distanceCharge.toFixed(2)),
//         totalExtraCharges: Number(totalExtraCharges.toFixed(2)),
//         totalPrice
//       }
//     });

//   } catch (error) {
//     console.error("Booking Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while creating booking"
//     });
//   }
// };


// GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



