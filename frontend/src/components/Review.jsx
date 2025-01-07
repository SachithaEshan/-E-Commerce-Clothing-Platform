import React, { useEffect, useState, useContext } from "react";
import { getReviews, addReview, updateReview, deleteReview } from "../api";
import { ShopContext } from "../context/ShopContext";
import { FaStar } from "react-icons/fa";

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: "", rating: 0, comment: "" });
  const backendURL= import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await getReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddReview = async () => {
    try {
      if (newReview.user && newReview.rating && newReview.comment) {
        await addReview({ ...newReview, productId });
        setNewReview({ user: "", rating: 0, comment: "" });
        fetchReviews();
      } else {
        alert("Please fill in all fields.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateReview = async (id, updatedReview) => {
    try {
      await updateReview(id, updatedReview);
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id);
      fetchReviews();
    } catch (erro) {
      console.error(erro);
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };


console.log("Product ID:", productId);

  return (
    <div className="border-t pt-8">
      <h2 className="text-xl mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="mb-6">No reviews yet. Be the first to add one!</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 mb-4 border border-gray-300 rounded-md bg-gray-50"
          >
            <p>
              <strong>{review.user}</strong> - {Array.from({ length: review.rating }, (_, i) => (
                <FaStar key={i} color="#FFD700" />
              ))}
            </p>
            <p>{review.comment}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() =>
                  handleUpdateReview(review._id, {
                    ...review,
                    comment: "Updated Comment",
                  })
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <div className="mt-8">
        <h3 className="text-lg mb-4">Add Review</h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            className="border p-2 rounded-md"
          />
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                color={newReview.rating > i ? "#FFD700" : "#E4E5E9"}
                onClick={() => handleRatingChange(i + 1)}
                className="cursor-pointer"
              />
            ))}
          </div>
          <textarea
            placeholder="Your Comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="border p-2 rounded-md"
          ></textarea>
          <button
            onClick={handleAddReview}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
