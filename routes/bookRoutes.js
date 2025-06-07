import express from "express";
import {authenticate} from "../middleware/authMiddleware.js";
import {getAllBooks, postNewBook} from "../controllers/bookController.js";

const router = express.Router();

router.post("/books", authenticate, postNewBook);

router.get('/books', authenticate, getAllBooks)

export default router;