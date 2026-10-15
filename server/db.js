require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = mongoose 
   .connect(process.env.MONGO_URI)
   .then(() => {
    console.log("Successfully connected to MongoDB.")
   })
   .catch((error) => {
    console.log("MongoDB connection error:", error.message);
    throw error;
   });

   module.exports = dbConnection;