const { check } = require("express-validator");
const movieController = require("../controllers/MovieController");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const { createMovie, getMovieById, getAllMovies, updateMovie, deleteMovie } = movieController;

const validation = [
  check("title").not().isEmpty(),
  check("description").not().isEmpty(),
  check("creator").not().isEmpty(),
];

router.post("/", [auth, validation], createMovie);

router.get("/:id", getMovieById);

router.get("/", getAllMovies);

router.patch("/:id", [auth, validation], updateMovie);

router.delete("/:id", auth, deleteMovie);

module.exports = router;
