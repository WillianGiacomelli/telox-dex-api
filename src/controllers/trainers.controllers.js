const PokemonModel = require("../model/pokemon.model");
const TrainerModel = require("../model/trainer.model");

const list = async (req, res) => {
  trainerFilter = req.query;

  try {
    if (trainerFilter) {
      const trainers = await TrainerModel.find(trainerFilter);

      return res.status(200).json(trainers);
    }

    const trainers = await TrainerModel.find();

    return res.status(200).json(trainers);
  } catch (error) {
    return res.status(400).json({
      error: "@trainers/list",
      message: error.message || `Trainers not foud ${error}`,
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error();
    }

    const trainer = await TrainerModel.findById(id);

    if (!trainer) {
      throw new Error();
    }

    return res.status(200).json(trainer);
  } catch (error) {
    return res.status(400).json({
      error: "@trainers/getById",
      message: error.message || `Trainer not foud ${error}`,
    });
  }
};

const create = async (req, res) => {
  const { name, age, location, is_leader, badges, speciality, pokemons } =
    req.body;

  try {
    const pokemonslist = await PokemonModel.find({ _id: { $in: pokemons } });

    const trainer = await TrainerModel.create({
      name,
      age,
      location,
      is_leader,
      badges,
      speciality,
      pokemons: pokemons,
    });

    return res.status(201).json(trainer);
  } catch (error) {
    return res.status(400).json({
      error: "@trainers/create",
      message: error.message || "failed to create",
    });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, age, location, is_leader, badges, speciality, pokemons } =
    req.body;

  try {
    if (!id) {
      throw new Error();
    }

    pokemonsList = await PokemonModel.find({ _id: { $in: pokemons } });

    const trainerUpdated = await TrainerModel.findByIdAndUpdate(
      id,
      {
        name,
        age,
        location,
        is_leader,
        badges,
        speciality,
        pokemons: pokemonsList,
      },
      {
        new: true,
      }
    );

    return res.status(201).json(trainerUpdated);
  } catch (error) {
    return res.status(400).json({
      error: "@trainers/update",
      message: error.message || `Trainer not foud ${error}`,
    });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error();
    }

    const trainerDeleted = await TrainerModel.findByIdAndDelete(id);

    if (!trainerDeleted) {
      throw new Error();
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      error: "@trainers/remove",
      message: error.message || `Trainer not foud ${error}`,
    });
  }
};

module.exports = {
  create,
  list,
  getById,
  update,
  remove,
};
