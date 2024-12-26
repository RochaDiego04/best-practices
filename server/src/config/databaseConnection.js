const mongoose = require("mongoose");
require("dotenv").config();

const setupDB = (callback) => {
  console.log("setupDB function called");

  const uri = process.env.MONGO_URI;

  console.log("Attempting to connect to MongoDB with URI:", uri);

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
      callback("DB OK");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err.message);
      callback(err.message);
    });
};

const getDB = () => {
  return mongoose.connection.db;
};
module.exports = { setupDB, getDB };
