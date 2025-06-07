import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);