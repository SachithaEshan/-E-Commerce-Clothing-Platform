import express from "express";
import { addNewReview,getReviews , updateReview, deleteReview} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/addnewreview", addNewReview);

reviewRouter.get("/", getReviews); // New route to fetch reviews

reviewRouter.put("/updateReview", updateReview);


reviewRouter.delete("/deleteReview", deleteReview);


// // POST a new review
// router.post("/", async (req, res) => {
//   const { productId, userId, rating, comment } = req.body;
//   // if (!productId || !userId || !rating || !comment) {
//   //   return res.status(400).json({ message: "All fields are required" });
//   // }
//   try {
//     const newReview = new Review({ productId, userId, rating, comment });
//     await newReview.save();
//     res
//       .status(201)
//       .json({ message: "Review added successfully", review: newReview });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to add review" });
//   }
// });

// // GET reviews for a product
// router.get("/:productId", async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const reviews = await Review.find({ productId }).populate(
//       "userId",
//       "name email"
//     );
//     res.status(200).json(reviews);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch reviews" });
//   }
// });

// // PUT (update) review
// router.put("/:id", async (req, res) => {
//   try {
//     const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!review) return res.status(404).json({ message: "Review not found" });
//     res.json({ message: "Review updated", review });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // DELETE a review
// router.delete("/:id", async (req, res) => {
//   try {
//     const review = await Review.findByIdAndDelete(req.params.id);
//     if (!review) return res.status(404).json({ message: "Review not found" });
//     res.json({ message: "Review deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default reviewRouter;