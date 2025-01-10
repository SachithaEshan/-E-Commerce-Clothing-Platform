import request from "supertest";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import reviewRoute from "./routes/reviewRoute.js";

// Mock external dependencies
jest.mock("./config/mongodb.js");
jest.mock("./config/cloudinary.js");

// Create an Express app instance for testing
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/reviews", reviewRoute);

// Health check route
app.get("/", (req, res) => {
  res.send("API WORKING");
});

describe("API Endpoints", () => {
  beforeAll(() => {
    // Setup any necessary configurations, if required.
    connectDB.mockImplementation(() => Promise.resolve());
    connectCloudinary.mockImplementation(() => Promise.resolve());
  });

  // Test the health check route
  it('should return "API WORKING" on the root route', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("API WORKING");
  });

  // Test the /api/user route (mocking the actual behavior)
  it("should return a 200 status on GET /api/user", async () => {
    const response = await request(app).get("/api/user");
    expect(response.status).toBe(200);
    // You can also check the response body here if applicable
  });

  // Test the /api/product route
  it("should return a 200 status on GET /api/product", async () => {
    const response = await request(app).get("/api/product");
    expect(response.status).toBe(200);
  });

  // Test the /api/reviews route
  it("should return a 200 status on GET /api/reviews", async () => {
    const response = await request(app).get("/api/reviews");
    expect(response.status).toBe(200);
  });

  // Test for a POST request (example with user data)
  it("should return a 201 status on POST /api/user", async () => {
    const userData = { name: "John Doe", email: "john@example.com" };
    const response = await request(app).post("/api/user").send(userData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", "John Doe");
    expect(response.body).toHaveProperty("email", "john@example.com");
  });

  // Test for an invalid route
  it("should return a 404 status for non-existent routes", async () => {
    const response = await request(app).get("/api/invalid-route");
    expect(response.status).toBe(404);
  });
});
