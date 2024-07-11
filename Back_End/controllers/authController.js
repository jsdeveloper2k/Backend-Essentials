const catchAsyncError = require('../middleWares/catchAsyncError');
const User=require('../models/userModel');
const ErrorHandler= require('../utils/errorHandler');
const sendToken = require('../utils/jwt')

// creating register user handler function
exports.registerUser = catchAsyncError (async(req,res,next)=>{
    const{name, email,password,avatar} = req.body;
    // creating the user Object
   const user = await User.create({
        name, email, password,avatar
    });

    // const token = user.getJwtToken()
    // res.status(201).json({
    //     success:true,
    //     user,
    //     token
    // })
// writing as separate function in different page 
    sendToken(user,201, res)
})
// login functionality
exports.loginUser = catchAsyncError(async(req,res,next)=>{
     const {email, password}=req.body 
     if(!email || !password){
        return  next(new ErrorHandler('Please Enter Email & Password ', 400))
     }
     // finding the user data from DB 
    //   + sign indicate that password field will  fetch by using the below line
      const user = await User.findOne({email}).select('+password');
    //   checking the user is exist or not 
      if(!user){
        return  next(new ErrorHandler('Invalid Email Or Password ', 401))
      }
    //  checking the password is correct or not 
      if(!await user.isValidPassword(password)){
        return  next(new ErrorHandler('Invalid Email Or Password ', 401))
      }
    //  giving back the password and token 
    sendToken(user,201,res)
    })
