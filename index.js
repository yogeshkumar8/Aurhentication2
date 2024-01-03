const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const {connect} = require("./config/database")
connect();

//Route import
const user = require("./routes/user");
app.use("/",user);

//activate 
app.listen(PORT,()=>{
    console.log(`App start at ${PORT}`)
})