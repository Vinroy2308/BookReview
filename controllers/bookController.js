import {Book} from "../models/book.js";
import {Review} from "../models/review.js";

// Function to add a new book and its details in the database.
const postNewBook = async (req, res) => {
    const { title, author, description, genre} = req.body;

    const book = new Book({title, author, description, genre});

    try {
        await book.save();
        res.status(201).json({message: `${book} added successfully by user ${req.user.id}`})
    }catch(err) {
        res.status(401).json({message: "Not able to add a book", error: err});
    }
}

// Get function which allows the users to view all the books in the database
const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
}

// Get function to display all the details of the books along with the reviews posted by the user
// Also shows the average rating for the book
const getBookDetails = async (req, res) => {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (!book) {
        res.status(404).json({message: "Book not found"});
    }

    const reviews = await Review.find({bookId: id});

    // Calculating the average rating of the book retrieved from the reviews collection
    const averageRating = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

    res.json({
        book,
        rating: averageRating.toFixed(1),
        reviews
    });
}

export {
    postNewBook,
    getAllBooks,
    getBookDetails,
}