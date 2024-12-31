import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1); // Exit the application if the connection fails
  }
};
