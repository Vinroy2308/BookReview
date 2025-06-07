import {Review} from "../models/review.js";

// Function to add a review to a book based on the bookId
// This function checks if the user has already added review for the book. If the review exists then it'll not allow the user to add the new review
const postReview = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id;

    const checkReviewAvailable = await Review.find({bookId: bookId, userId: userId});
    if (checkReviewAvailable){
        return res.status(401).json({message:"You have already reviewed this book. This action cannot be performed more than once."});
    }
    const bookReview = req.body;

    const newReview = new Review({bookId: bookId, userId: userId, rating: bookReview.rating, review: bookReview.review});

    await newReview.save();
    return res.status(201).json({message:"Your review has been added successfully."});

}


// Function to update the review of the authenticated user
// Checks if the users review exists in the database with the provided review id, if not available then it won't allow the user to update review
const updateReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const checkUserReview = await Review.findOne({_id: reviewId, userId: userId});
    if (!checkUserReview){
        return res.status(401).json({message: "You cannot update this review. Only the review owner can update this."})
    }
    const updatedReview = req.body;
    await Review.findByIdAndUpdate(reviewId, {review: updatedReview.review});
    return res.status(200).json({message:"Your review has been updated successfully."});
}

//Function to delete the review by the authenticated user
// Checks if the users review exists in the database with the provided review id, if not available then it won't allow the user to delete review
const deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const checkUserReview = await Review.findOne({_id: reviewId, userId: userId});
    if (!checkUserReview){
        return res.status(401).json({message: "You cannot delete this review. Only the review owner can delete this."})
    }
    await Review.findByIdAndDelete(reviewId);
    return res.status(200).json({message:"Your review has been deleted successfully."});
}

export {
    postReview,
    updateReview,
    deleteReview,
}