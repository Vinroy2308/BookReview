import {Book} from "../models/book.js";
import {Review} from "../models/review.js";
import {
    addBook, addReview,
    calculateAverageRating,
    findAllBooks,
    findBookById, findBookByQuery,
    findReviewByUserAndBook,
    getAllReviews
} from "../models/mongodb.js";

// Function to add a new book and its details in the database.
const postNewBook = async (req, res) => {
    const { title, author, description, genre} = req.body;

    const book = new Book({title, author, description, genre});

    try {
        await addBook(book);
        return res.status(201).json({message: `${book} added successfully by user ${req.user.id}`})
    }catch(err) {
        return res.status(500).json({message: "Not able to add a book", error: err});
    }
}

// Get function which allows the users to view all the books in the database
const getAllBooks = async (req, res) => {
    try {
        const {page, limit, genre, author} = req.query;

        //bookFilter is used to filter the books by genre and author. For Author RegExp is used for partial and case-insensitive words
        const bookFilter = {};
        if (genre) bookFilter["genre"] = genre;
        if (author) bookFilter["author"] = new RegExp(author, "i");
        const books = await findAllBooks(bookFilter, page, limit);
        return res.json({
            books,
            pageNumber: page,
        });
    } catch (e) {
        return res.status(500).json({message: "Faced an issue when getting all books from the database", e});
    }

}

// Get function to display all the details of the books along with the reviews posted by the user
// Also shows the average rating for the book
const getBookDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const {page, limit} = req.query;
        const book = await findBookById(id);
        if (!book) {
            return res.status(404).json({message: "Book not found"});
        }

        // Calculating the average rating of the book retrieved from the reviews collection
        const averageRating = await calculateAverageRating(id);

        const reviewsPaginated = await getAllReviews(id, page, limit);

        return res.json({
            book,
            rating: averageRating.toFixed(1),
            reviews: reviewsPaginated,
            pageNumber: page,
        });
    } catch (e) {
        res.status(500).json({message: "Error encountered while fetching the book details", e});
    }

}

const postReview = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;

        const checkReviewAvailable = await findReviewByUserAndBook(bookId, userId);
        if (checkReviewAvailable.length > 0) {
            return res.status(400).json({message: "You have already reviewed this book. This action cannot be performed more than once."});
        }
        const bookReview = req.body;

        const newReview = new Review({
            bookId: bookId,
            userId: userId,
            rating: bookReview.rating,
            review: bookReview.review
        });

        await addReview(newReview);
        return res.status(201).json({message: "Your review has been added successfully."});
    } catch (e) {
        return res.status(500).json({message: "Faced an issue while saving the review", e});
    }


}

const searchBook = async (req, res) => {
    try {
        const {query} = req.query;
        if (!query) {
            return res.status(400).json({message: "Search query is required"});
        }

        const books = await findBookByQuery(query);

        return res.json({books});
    } catch (e) {
        return res.status(500).json({message: "Search query failed", e});
    }

}

export {
    postNewBook,
    getAllBooks,
    getBookDetails,
    postReview,
    searchBook,
}