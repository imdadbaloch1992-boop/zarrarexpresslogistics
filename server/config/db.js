import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('MONGO_URI not found! Check your .env file.');
    process.exit(1);
  }

  try {
    // Mongoose v7+ doesn't require useNewUrlParser or useUnifiedTopology
    await mongoose.connect(uri);
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;