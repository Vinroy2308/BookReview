import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {getAllBooks, getBookDetails, postNewBook} from "../controllers/bookController.js";

const router = express.Router();

router.post("/books", authenticate, postNewBook);

router.get('/books', authenticate, getAllBooks)

router.get('/books/:id', authenticate, getBookDetails)

export default router;