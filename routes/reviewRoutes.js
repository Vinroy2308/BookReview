import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {deleteReview, postReview, updateReview} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/books/:id/reviews", authenticate, postReview);

router.put("/reviews/:id", authenticate, updateReview);

router.delete("/reviews/:id", authenticate, deleteReview);

export default router;