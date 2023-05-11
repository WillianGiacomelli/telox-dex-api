const express = require("express");

const pokemonsRoutes = require("./routes/pokemons");
const trainersRoutes = require("./routes/trainers");

require("./config/database");

const app = express();

const { PORT } = require("./config/env");

app.use(express.json());
app.use(pokemonsRoutes);
app.use(trainersRoutes);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
