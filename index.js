const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.json());
const jwt = require("jsonwebtoken")

const {User}=require("./models/user.model")
const{Profile}=require("./models/profile.model")

const jwt = require("jsonwebtoken");

//connect to database
mongoose
  .connect(
    "mongodb+srv://h1403lovea0711:14032003@cluster0.jqrbnu2.mongodb.net/"
  )
  .then(() => {
    console.log("mongodb is connect");
  })
  .catch((error) => {
    console.log("error:", error);
  });
//userRouter and profileRouter
const userRouter = require("./controllers/user.controller")
app.use("/user",userRouter)
const profileRouter = require("./controllers/profile.controller")
app.use("/profile",profileRouter);
//mapping user + profile
app.get("/user/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
      .populate({
        path: "Profile",
        select: { 
            fullName:1,
            dateOfBirth:1,
            placeOfBirth:1,
            country:1, 
            personalSkills:1, interests:1, personalGoals:1},
      })
      .lean();
    res.json(user);
  });

//create api login 
app.post("/login",async (req,res)=>{
    const {email, password} = req.body;
    const userSelect = {
        email,
        password,
    }
    const user=await User.findOne(userSelect).exec();
    if(user){
        const payLoad = {
            email:user.email,
            fullName:user.fullName,
            dateOfBirth:user.dateOfBirth,
            placeOfBirth:user.placeOfBirth,
            country:user.country,
        }
        const token = jwt.sign(payLoad,"hunghoang",{expiredIn:"1d"})
        res.send(token)
    }
    else{
        return req.status(401).json({message:"invalid"})
    }
})
//authorization
app.listen(port, () => {
  console.log("connect to server");
});
