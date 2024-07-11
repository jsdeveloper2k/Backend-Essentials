// will handle error related middleWare

const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV == "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new Error(message);
    if (err.name == "ValidatorError") {
      // Object.values() will give all the property of object in the form of array
      message = Object.values(err.errors).map((value) => value.message)
      error = new ErrorHandler(message)
    }

    // NOT WORKING 
    // if (err.name == "CastError") {
    //   message = `Resource not Found : ${err.path}`;
    //   error = new Error(message);
    // }
    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
