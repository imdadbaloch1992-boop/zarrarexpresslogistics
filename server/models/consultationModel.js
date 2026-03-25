import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  name: { type: String, required: true },        // From "Your Name" input
  email: { type: String, required: true },       // From "Email Address" input
  message: { type: String, required: true },     // From "Tell us about your cargo requirements" textarea
}, { timestamps: true });                         // Automatically adds createdAt and updatedAt

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;