import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {getAllBooks, getBookDetails, postNewBook, postReview, searchBook} from "../controllers/bookController.js";


const router = express.Router();

router.post("/", authenticate, postNewBook);

router.get('/', getAllBooks);

router.get('/search', searchBook);

router.get('/:id', getBookDetails);

router.post("/:id/reviews", authenticate, postReview);



export default router;