const express = require("express");

require("./config/database");

const app = express();

const { PORT } = require("./config/env");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
