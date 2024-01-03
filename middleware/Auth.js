
const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.auth = (req,res, next) => {
    try{
       //extract JWT token
        //PENDING : other ways to fetch token

        console.log("cookie" , req.cookies.token);
        console.log("body" , req.body.token);
        console.log("header", req.header("Authorization"));
       
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        //verify the token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload)
            req.user = payload;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }
        next();
    }catch(err){
        return res.status(401),json({
            success:false,
            message:"Something Went wrong while verifying token"
        })
    }
}

exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message: "This is A protected Route for Student",
            });
        }
        next();
    }catch(err){
        return res.status(500),json({
            success:false,
            message:"User Role is Not Match"
        })
    }
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message: "This is A protected Route for Admin",
            });
        }
        next();
    }catch(err){
        return res.status(500),json({
            success:false,
            message:"User Role is Not Match"
        })
    }
}