import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {User} from "../models/user.js";
import {addUser, getUser} from "../models/mongodb.js";

// Register function to register new users to access the application features
const register = async (req, res) => {
    const {username, email, password} = req.body;

    const userExists = await getUser(email);
    if (userExists) {
        return res.status(400).json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({username, email, password: hashedPassword});

    try {
        await addUser(user);
        res.status(201).json({message:`${user.username} is successfully registered in the database`});
    } catch (e) {
        res.status(400).json({message: "Error occurred while saving the user ", e});
    }

}


// Login function to log the users in the application
const login = async (req, res) => {
    const {email, password} = req.body;


    // Check if the user exists in the database
    const user = await getUser(email);
    if(!user){
        return res.status(401).json({message:"User not found"});
    }

    // Used to check if the password from the request is the same as the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.status(400).json({message:"Invalid credentials. Please try again"});
    }

    // Creates JWT token and sends the response with both token and userId
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({
        token:token
    });
}

export {
    register, login
};