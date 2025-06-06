import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";

dotenv.config();

connectDB()

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());