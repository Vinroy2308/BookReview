import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    review: {type: String }
}, {timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);