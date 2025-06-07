import {Book} from "../models/book.js";

// Function to add a new book and its details in the database.
const postNewBook = async (req, res) => {
    const { title, author, description, genre} = req.body;

    const book = new Book({title, author, description, genre});

    try {
        await book.save();
        res.status(201).json({message: `${book} added successfully`})
    }catch(err) {
        res.status(401).json({message: "Not able to add a book", error: err});
    }
}

// Get function which allows the users to view all the books in the database
const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
}

export {
    postNewBook,
    getAllBooks,
}