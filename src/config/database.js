const mongoose = require("mongoose");

const { MONGO_DB_URI } = require("./env");

mongoose.connect(MONGO_DB_URI, {
  autoIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connected succesfully");
});

mongoose.connection.on("error", (error) => {
  console.log("Failed to connect database", error);
});
