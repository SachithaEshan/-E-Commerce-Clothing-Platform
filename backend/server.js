import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import router from "./routes/collectionRoute.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";

// config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary()

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter)
app.use("/api/reviews", reviewRoute);
app.use("/api/collection", router);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
