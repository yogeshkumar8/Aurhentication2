const express = require("express");
const router = express.Router();
const User = require("../model/userData");

const {login ,signup} = require("../controllers/auth");
// const {auth} = require("../middleware/Auth")
const {auth,isStudent,isAdmin} = require("../middleware/Auth")
 
router.post("/login",login);   
router.post("/signup",signup);  


router.get("/test",auth, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Routes of Test"
    })
}); 

router.get("/open", (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Routes of open"
    })
}); 
router.get("/student",auth,isStudent , (req,res)=>{
    res.json({ 
        success:true,
        message:"Welcome to the Routes of Student"
    })
});


router.get("/admin",auth,isAdmin , (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Routes of Student"
    })
});

router.get("/getEmail" ,auth, async (req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id); 

        res.status(200).json({
            success:true,
            user: user,
            message: "Welcome to the Email Routes"
        })
    }
    catch(err){

        res.status(500).json({
            success:false,
            error: err.message,
            message: "Error in the Email Routes"
        }) 
    }

})


module.exports = router; 