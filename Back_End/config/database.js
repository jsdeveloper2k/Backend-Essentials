const mongoose = require("mongoose");
const connectDataBase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/k2cart", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB  is connected to the host: 127.0.0.1`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDataBase;
