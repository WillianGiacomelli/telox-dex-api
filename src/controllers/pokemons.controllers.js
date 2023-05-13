const PokemonModel = require("../model/pokemon.model");

const list = async (req, res) => {
  const querypokemon = req.query;
  try {
    const pokemons = await PokemonModel.find(querypokemon || {});

    return res.json(pokemons);
  } catch (error) {
    return res.status(400).json({
      error: "pokemons/list",
      message: error.message || "Failed to list pokemons",
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await PokemonModel.findById(id);

    if (!pokemon) {
      throw new Error();
    }

    return res.json(pokemon);
  } catch (error) {
    return res.status(400).json({
      error: "@pokemons/getById",
      message: error.message || `pokemon not found ${id}`,
    });
  }
};

const create = async (req, res) => {
  const { attack, defense, hp, name, speed, type1, type2, is_legendary } =
    req.body;

  const pokedex_number = await PokemonModel.find().count();

  try {
    const pokemon = await PokemonModel.create({
      attack,
      defense,
      hp,
      name,
      pokedex_number: pokedex_number + 1,
      speed,
      type1,
      type2,
      is_legendary,
    });

    return res.json(pokemon);
  } catch (error) {
    return res.status(400).json({
      error: "@pokemons/create",
      message: error.message || "Failed to create a pokemon",
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  const { attack, defense, hp, name, speed, type1, type2, is_legendary } =
    req.body;

  try {
    const pokemonUpdated = await PokemonModel.findByIdAndUpdate(
      id,
      { attack, defense, hp, name, speed, type1, type2, is_legendary },
      {
        new: true,
      }
    );
    if (!pokemonUpdated) {
      throw new Error();
    }

    return res.json(pokemonUpdated);
  } catch (error) {
    return res.status(400).json({
      error: "@pokemons/update",
      message: `pokemon not found ${id}`,
    });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemonRemoved = await PokemonModel.findByIdAndDelete(id);
    if (!pokemonRemoved) {
      throw new Error();
    }
    return res.status(204).json(pokemonRemoved);
  } catch {
    return res.status(400).json({
      error: "@pokemons/remove",
      message: `pokemon not found ${id}`,
    });
  }
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
