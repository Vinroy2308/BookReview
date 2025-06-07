import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    ratings: [{ type: Number, default: 0 }],
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);