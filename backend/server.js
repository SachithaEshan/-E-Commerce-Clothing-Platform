import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import wishlistRoutes from './routes/wishlistRoutes.js'; 

// config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);

app.use("/api/wishlist", wishlistRoutes); 

 app.use("/api/product", productRouter);
 app.use("/api/cart", cartrRouter);


app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
