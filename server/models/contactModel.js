import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },        // First Name
  lastName: { type: String, required: true },         // Last Name
  email: { type: String, required: true },            // Email Address
  mobileNumber: { type: String, required: true },     // Mobile Number
  companyName: { type: String },                      // Company Name (optional)
  collectionPostcode: { type: String, required: true }, // Collection Postcode
  requirements: [{ type: String }],                  // Array of strings for checkboxes
  message: { type: String },                          // Message textarea
}, { timestamps: true });                             // Adds createdAt, updatedAt

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;