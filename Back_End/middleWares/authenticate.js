const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError( async (req, res, next) => {

   //accessing the cookies in that we accessing the our token 
   //  for that we need to use cookie-parser middleWare in app.js file
   //  npm i cookie-parser
   const { token  }  = req.cookies;
   
   if( !token ){
        return next(new ErrorHandler('Login first to handle this resource', 401))
   }
     // decoding the token 
   const decoded = jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id)
   next();
})

exports.authorizeRoles = (...roles) => {
   return  (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next()
    }
}   