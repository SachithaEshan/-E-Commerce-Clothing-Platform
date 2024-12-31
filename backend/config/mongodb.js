import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URL}/e-sportswear`);
  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });
};
