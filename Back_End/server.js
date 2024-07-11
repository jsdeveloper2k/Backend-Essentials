const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDataBase = require("./config/database");

//  joining the dotenv and config file
//  want to give absolute path
dotenv.config({ path: path.join(__dirname, "config/config.env") });

// using the connectDataBase () to call the that function to connect the DB
connectDataBase();

// developing the http server
const server = app.listen(8000, () => {
  console.log(`Server listening to the port 8000 in ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shuting down the server due to unhandled rejection`);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shuting down the server due to uncaught Exception Error`);
  server.close(() => {
    process.exit(1);
  });
});
// console.log(a);





