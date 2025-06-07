import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {deleteReview, updateReview} from "../controllers/reviewController.js";

const router = express.Router();

router.put("/:id", authenticate, updateReview);

router.delete("/:id", authenticate, deleteReview);

export default router;