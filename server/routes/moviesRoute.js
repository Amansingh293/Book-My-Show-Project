const router = require("express").Router();

const Movie = require("../model/moviesModel");

const authMiddleware = require("../middleware/authMiddleware");
const { request } = require("express");

router.post("/add-movie", authMiddleware, async (request, response) => {
  try {
    // const existing = await Movie({ address: request.body.address });

    // if (existing) {
    //   response
    //     .status(200)
    //     .send({ success: true , message: "Theatre Already Present !!" });
    // }
    request.body.duration = Math.round(request.body.duration / 60);

    const movie = new Movie(request.body);

    await movie.save();

    response
      .status(201)
      .send({ success: true, message: "Movie Added Successfully" });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.post("/edit-movie", authMiddleware, async (request, response) => {
  try {
    request.body.duration = Math.round(request.body.duration);

    const movie = await Movie.findByIdAndUpdate(request.body._id, request.body);

    response
      .status(200)
      .send({ success: true, message: "Movie Editted Successfully" });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.get("/get-all-movies", authMiddleware, async (_, response) => {
  try {
    const allMovies = await Movie.find();

    response.status(200).send({
      success: true,
      message: "All Movies Retrieved",
      data: allMovies,
    });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.get("/get-movie-by-id", authMiddleware, async (request, response) => {
  try {
    const movie = await Movie.findById({ _id: request.query.movieId });

    response.status(200).send({
      success: true,
      message: "Movie Retrieved",
      data: movie,
    });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.delete("/delete-movie", authMiddleware, async (request, response) => {
  try {
    await Movie.findByIdAndDelete(request.query.movie_id);

    response.status(200).send({
      success: true,
      message: "Movie Deleted Successfully",
      // data: allMovies,
    });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.get("/get-by-search", authMiddleware, async (request, response) => {
  try {
    const searchedMovies = await Movie.find({
      name: { $regex: request.query.search, $options: 'i' }, 
    });

    if (!searchedMovies) {
      return response.status(404).send({
        success: false,
        message: "No movie found!!",
      });
    }
    return response.status(200).send({
      success: true,
      message: "Searched Movies Retrieved",
      data: searchedMovies,
    });
  } catch (error) {
    console.log(error.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

module.exports = router;
