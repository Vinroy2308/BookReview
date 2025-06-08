import {User} from "./user.js";
import {Book} from "./book.js";
import {Review} from "./review.js";
// Centralized mongodb file for keeping all the mongodb function in one place


// Add user to the database
const addUser = async (user) => {
    try {
        return await user.save();
    }catch(err) {
        console.log("Error occurred while saving user to the database ",err);
        throw err;
    }
}

// Function to get user from the database. Used when logging in.
const getUser = async (email) => {
    try {
        return await User.findOne({email: email});
    } catch (err) {
        console.log("Error occurred while getting user by email ", err);
        throw err;
    }
}

// Function to save a book to the database.
const addBook = async (book) => {
    try {
        return await book.save();
    } catch (err) {
        console.log("Error occurred while saving book ", err);
        throw err
    }
}


// Function to get all books from the database. Filter is used to filter based on author and genre. Includes pagination
const findAllBooks = async (filter, page = 1, limit = 10) => {
    try {
        return await Book.find(filter).skip((page - 1) * limit).limit(limit);
    } catch (err) {
        console.log("Error occurred while getting books ", err);
        throw err;
    }
}

// Function to find book based on the provided id
const findBookById = async (id) => {
    try {
        return await Book.findById(id);
    } catch (err) {
        console.log("Error occurred while finding book by id", err);
        throw err;
    }
}

// Function to calculate the average rating of a book based on the reviews provided by users
const calculateAverageRating = async (bookId) => {
    try {
        const reviews = await Review.find({bookId});
        return reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    } catch (err) {
        console.log("Error occurred while getting reviews to calculate average rating", err);
        throw err;
    }
}

//  Function to get all reviews of a book based on its id. Included pagination.
const getAllReviews = async (bookId, page = 1, limit = 10) => {
    try {
        return await Review.find({bookId}).skip((page - 1) * limit).limit(limit);
    } catch (err) {
        console.log("Error occurred while getting books ", err);
        throw err;
    }
}

// Function to find a review based on the bookId and userId. Used to check if a review already exists from a user for the book.
const findReviewByUserAndBook = async (bookId, userId) => {
    try {
        return await Review.find({bookId: bookId, userId: userId});
    } catch (err) {
        console.log("Error occurred while getting books ", err);
        throw err;
    }
}

// Function to save a Review to the database.
const addReview = async (review) => {
    try {
        return await review.save();
    } catch (err) {
        console.log("Error occurred while saving review", err);
        throw err;
    }
}

// Function to search for book based on the query provided.
// It can be either title or author of the book where partial or case-insensitive values are provided
// It checks whether either of the condition matches
const findBookByQuery = async (query) => {
    try {
        return await Book.find({
            $or: [
                {title: {$regex: query, $options: "i"}},
                {author: {$regex: query, $options: "i"}}
            ]
        });
    } catch (err) {
        console.log("Error occurred while getting books for search method ", err);
        throw err;
    }
}

// Function to find a review based on the review id and user id.
// Used to check if the review belongs to the user.
// This is used in update and delete review so only the review user can do these operations.
const findUserReview = async (id, userId) => {
    try {
        return await Review.findOne({id, userId});
    } catch (err) {
        console.log("Error occurred while getting user review", err);
        throw err;
    }
}

// Function to update the review of the user.
// updatedReview is the review to be updated and is queried using the review id.
const updateUserReview = async (id, updatedReview) => {
    try {
        return await Review.findByIdAndUpdate({_id: id}, {review: updatedReview});
    } catch (err) {
        console.log("Error occurred while updating user review ", err);
        throw err;
    }
}

// Function to delete the review of the user based on the review id provided.
const deleteUserReview = async (id) => {
    try {
        return await Review.findByIdAndDelete({_id: id});
    } catch (err) {
        console.log("Error occurred while deleting user review", err);
        throw err;
    }
}

export {
    addUser,
    getUser,
    addBook,
    findAllBooks,
    findBookById,
    calculateAverageRating,
    getAllReviews,
    findReviewByUserAndBook,
    addReview,
    findBookByQuery,
    findUserReview,
    updateUserReview,
    deleteUserReview,
}