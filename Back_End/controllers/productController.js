const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleWares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

// getting the product from DB  - {{base_url}}/api/v1/products
exports.getProducts = async (req, res, next) => {
  const resPerPage=2;
  const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};
// creating the new product   -- {{base_url}}/api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get single product by id -  {{base_url}}/api/v1/product/668836bda4dbc7d545dff28c
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found ", 400));
  }
  res.status(201).json({
    success: true,
    product,
  });
};

// update Product --   {{base_url}}/api/v1/product/668836bda4dbc7d545dff28c
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
};

// delete Product -- {{base_url}}/api/v1/product/668836bda4dbc7d545dff28c
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
  await Product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
};
