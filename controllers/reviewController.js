import {deleteUserReview, findUserReview, updateUserReview} from "../models/mongodb.js";


// Function to update the review of the authenticated user
// Checks if the users review exists in the database with the provided review id, if not available then it won't allow the user to update review
const updateReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const checkUserReview = await findUserReview(reviewId, userId);
    console.log(checkUserReview);
    if (checkUserReview !== null && checkUserReview !== undefined) {
        return res.status(400).json({message: "You cannot update this review. Only the review owner can update this."})
    }
    const updatedReview = req.body;
    await updateUserReview(reviewId, updatedReview.review);
    return res.status(200).json({message:"Your review has been updated successfully."});
}

//Function to delete the review by the authenticated user
// Checks if the users review exists in the database with the provided review id, if not available then it won't allow the user to delete review
const deleteReview = async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const checkUserReview = await findUserReview(reviewId, userId);
    if (checkUserReview !== null && checkUserReview !== undefined){
        return res.status(400).json({message: "You cannot delete this review. Only the review owner can delete this."})
    }
    await deleteUserReview(reviewId);
    return res.status(200).json({message:"Your review has been deleted successfully."});
}

export {
    updateReview,
    deleteReview,
}