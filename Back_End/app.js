const express= require('express');
const products =require('./routes/product');
const errorMiddleWare =require('./middleWares/error');
const auth= require('./routes/auth');
const cookie_parser = require('cookie-parser');

const app = express();
// giving permission for passing json data
app.use(express.json());
// middleWare for Cookies
app.use(cookie_parser);


// middleWare for product route
app.use('/api/v1/',products);
// middleWare for user Route
app.use('/api/v1',auth);

// middleWare for ErrorHandler
app.use(errorMiddleWare);


module.exports =app;