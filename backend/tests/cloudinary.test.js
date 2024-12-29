import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "../config/cloudinary.js";

jest.mock("cloudinary", () => ({
  v2: {
    config: jest.fn(), // Mock the config method
  },
}));

describe("Cloudinary Integration Tests", () => {
  it("should call cloudinary.config() with correct environment variables", async () => {
    process.env.CLOUDINARY_NAME = "mockName";
    process.env.CLOUDINARY_API_KEY = "mockApiKey";
    process.env.CLOUDINARY_SECRET_KEY = "mockSecretKey";

    await connectCloudinary();

    expect(cloudinary.config).toHaveBeenCalledWith({
      cloud_name: "mockName",
      api_key: "mockApiKey",
      api_secret: "mockSecretKey",
    });
  });
});
