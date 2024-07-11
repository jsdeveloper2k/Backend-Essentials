const products = require("../data/product.json");

// getting product model in the name of Product
const Product = require("../models/productModel");
const dotenv = require("dotenv");

// connecting DB to this seeder.js file
const connectDataBase = require("../config/database");
dotenv.config({ path: "backend/config.env" });
connectDataBase();

// inserting all products at a time
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("All Products Are deleted");
    await Product.insertMany(products);
    console.log("All Products Are Inserted");
  } catch (error) {
    console.log(error.message);
  }
  // to stop the node program
  process.exit();
};
seedProducts();
