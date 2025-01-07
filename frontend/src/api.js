import axios from 'axios';

const API_URL = 'http://localhost:4000/api/reviews';

export const getReviews = (productId) => axios.get(`${API_URL}/${productId}`);
export const addReview = (review) => axios.post(API_URL, review);
export const updateReview = (id, review) => axios.put(`${API_URL}/${id}`, review);
export const deleteReview = (id) => axios.delete(`${API_URL}/${id}`);
