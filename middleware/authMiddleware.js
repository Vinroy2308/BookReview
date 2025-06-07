import jwt from "jsonwebtoken";

// Function to authenticate the user to access different apis.
// Here the JWT token is verified
const authenticate = async (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"Unauthorized Access"});
    }

    const token = authHeader.split(' ')[1];

    try {
        // const user = await User.findById(decoded.id).select("-password");
        // if(!user){
        //     res.status(404).json({message:"User Not Found"});
        // }
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(403).json({message:"Invalid token"});
    }
}

export {authenticate};