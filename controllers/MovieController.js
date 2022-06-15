const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/UserModel");
const Movie = require("../models/MovieModel");

const createMovie = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, creator } = req.body;
  let existingUser = await User.findOne({ _id: creator });

  if (!existingUser) {
    return res.status(400).json({ error: "Invalid user" });
  }

  const CreatedMovie = new Movie({
    title,
    description,
    creator,
  });

  try {
    await CreatedMovie.save();
    res.status(400).json({ message: "Movie created succesfuly." });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getMovieById = async (req, res) => {
  const movieId = req.params.id;

  if (!ObjectId.isValid(movieId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json("There is no movie with this id.");
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, creator } = req.body;
  const movieId = req.params.id;

  if (!ObjectId.isValid(movieId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "movie not found." });
    }
    await movie.updateOne({
      title,
      description,
      creator,
    });
    res.status(200).json({ message: "movie updated successfuly." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  const movieId = req.params.id;

  if (!ObjectId.isValid(movieId)) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(400).json({ error: "There is no movie with this id." });
    }

    await movie.remove();
    res.status(200).json({ message: "Movie removed successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMovie,
  getMovieById,
  getAllMovies,
  updateMovie,
  deleteMovie,
};
