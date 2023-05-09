require("dotenv").config();

module.exports = {
  PORT: process.env.port,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
};
