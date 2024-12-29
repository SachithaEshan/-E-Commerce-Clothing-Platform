import mongoose from "mongoose"; // Import mongoose to mock it
import { connectDB } from "../config/mongodb"; // Named import for the connectDB function

jest.mock("mongoose", () => ({
  connect: jest.fn(), // Mock the mongoose.connect method
  connection: {
    on: jest.fn(), // Mock the mongoose.connection.on method
  },
}));

describe("MongoDB Connection Tests", () => {
  it("should connect to MongoDB successfully", async () => {
    const mockConnect = jest.fn().mockResolvedValueOnce(true); // Mock successful connection
    mongoose.connect = mockConnect; // Override the original mongoose.connect method

    await connectDB(); // Now connectDB will be called and mongoose.connect will be mocked

    // Check if mongoose.connect was called with the correct connection URL
    expect(mockConnect).toHaveBeenCalledWith(
      `${process.env.MONGODB_URL}/e-sportswear`
    );
  });
});
