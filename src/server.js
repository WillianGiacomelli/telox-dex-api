const express = require("express");

const app = express();

const { PORT } = require("./config/env");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
