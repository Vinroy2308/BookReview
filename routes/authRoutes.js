import express from "express";
import {login, register} from "../controllers/authController.js";


const router = express.Router();


// API paths for Register and Login Users
router.post('/signup', register);
router.post('/login', login);

export default router;