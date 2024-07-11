const mongoose = require("mongoose");

// creating Schema
// Schema  =bluePrints

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
    maxLength: [100, "Product Name Cannot Exceed 100 Characters"],
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please Enter The Product Description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please Select Correct Category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please Enter Product Seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [20, "Product Stock Cannot Exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String, 
        required: true 
    },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//  creating the model
// i will send schema then u will give model file for that schema

const model = mongoose.model("Product", productSchema);
module.exports = model;
