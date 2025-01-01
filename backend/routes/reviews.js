import express from "express";
import Review from "../models/Review.js";
const router = express.Router();


// Add Review
router.post('/', async (req, res) => {
    try {
        const { productId, user, rating, comment } = req.body;
        const review = new Review({ productId, user, rating, comment });
        await review.save();
        res.status(201).json({ message: 'Review added', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Reviews for a Product
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Review
router.put('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review updated', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Review
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






export default router;
