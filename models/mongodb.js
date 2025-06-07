import {User} from "./user.js";
import {Book} from "./book.js";
import {Review} from "./review.js";

const addUser = async (user) => {
    try {
        return await user.save();
    }catch(err) {
        console.log("Error occurred while saving user to the database ",err);
        throw err;
    }
}

const getUser = async (email) => {
    try {
        return await User.findOne({email: email});
    } catch (err) {
        console.log("Error occurred while getting user by email ", err);
        throw err;
    }
}

const addBook = async (book) => {
    try {
        return await book.save();
    } catch (err) {
        console.log("Error occurred while saving book ", err);
        throw err
    }
}

const findAllBooks = async (filter, page = 1, limit = 10) => {
    try {
        return await Book.find(filter).skip((page - 1) * limit).limit(limit);
    } catch (err) {
        console.log("Error occurred while getting books ", err);
        throw err;
    }
}

const findBookById = async (id) => {
    try {
        return await Book.findById(id);
    } catch (err) {
        console.log("Error occurred while finding book by id", err);
        throw err;
    }
}

const calculateAverageRating = async (bookId) => {
    try {
        const reviews = await Review.find({bookId});
        return reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    } catch (err) {
        console.log("Error occurred while getting reviews to calculate average rating", err);
        throw err;
    }
}

const getAllReviews = async (bookId, page = 1, limit = 10) => {
    try {
        return await Review.find({bookId}).skip((page - 1) * limit).limit(limit);
    } catch (err) {
        console.log("Error occurred while getting books ", err);
        throw err;
    }
}

const findReviewByUserAndBook = async (bookId, userId) => {
    try {
        return await Review.find({bookId: bookId, userId: userId});
    } catch (err) {
        console.log("Error occurred while getting books ", err);
        throw err;
    }
}

const addReview = async (review) => {
    try {
        return await review.save();
    } catch (err) {
        console.log("Error occurred while saving review", err);
        throw err;
    }
}

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

const findUserReview = async (id, userId) => {
    try {
        return await Review.findOne({id, userId});
    } catch (err) {
        console.log("Error occurred while getting user review", err);
        throw err;
    }
}

const updateUserReview = async (id, updatedReview) => {
    try {
        return await Review.findByIdAndUpdate({_id: id}, {review: updatedReview});
    } catch (err) {
        console.log("Error occurred while updating user review ", err);
        throw err;
    }
}

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