import jwt from "jsonwebtoken";
import {User} from "../models/user.js";

const authenticate = async (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"Unauthorized Access"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            res.status(404).json({message:"User Not Found"});
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({message:"Invalid token"});
    }
}

export {authenticate};