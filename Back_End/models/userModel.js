const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// creating the user schema
// schema- bluePrint
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: true,
    // installing  npm validator package
    // npm i validator for validating the email 
    validate: [validator.isEmail, "Please Enter Valid Email Address"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    maxLength: [6, "Password Cannot Exceed 6 Characters"],
    // will not fetch or show the password by using the below  field
    select:false
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPassword: {
    type: String,
  },
  resetPasswordTokenExpire:{
         type:Date
  },
  createdAt: {
    type: Date, 
    default: Date.now,
  },
});
// doing the any work before any method in DB
userSchema.pre('save', async function(next){

    // hashing the password by  using the npm bcrypt.js 
    // npm i bcrypt
    this.password = await bcrypt.hash(this.password , 10)
})
// generating the jwt token 
// npm i jsonwebtoken 
userSchema.methods.getJwtToken = function(){
   return  jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME 
    })
}
// checking the password is correct or not 
userSchema.methods.isValidPassword = async function (enteredPassword){
   return await  bcrypt.compare(enteredPassword, this.password)
}

// creating the Model
// file for that Schema
 let model=mongoose.model('User',userSchema)
module.exports =model