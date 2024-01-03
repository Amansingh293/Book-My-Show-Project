const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const Show = require("../model/showsModel");

router.post("/add-show", authMiddleware, async (request, response) => {
  try {
    const show = new Show(request.body);

    console.log(await show.save());

    response.status(201).send({
      success: true,
      message: "Show Added Successfully",
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get("/get-show-by-id", authMiddleware, async (request, response) => {
  try {
    const show = await Show.findById({ _id: request.query.showId })
      .populate("theatre")
      .populate("movie");

    response.status(200).send({
      success: true,
      message: "Show Retrieved Successfully",
      data: show,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post(
  "/get-shows-by-movie-id-date",
  authMiddleware,
  async (request, response) => {
    try {
      const shows = await Show.find({
        movie: request.body.movie,
        date: request.body.date,
      }).populate("theatre");

      const uniqueTheatres = [];

      shows.forEach((show) => {
        if (!show.theatre.isBlocked) {
          let theatre = uniqueTheatres.find((theatre) => {
            return theatre._id == show.theatre._id;
          });

          if (!theatre) {
            let showsForTheatre = shows.filter((showObj) => {
              return showObj.theatre._id == show.theatre._id;
            });

            uniqueTheatres.push({
              ...show.theatre._doc,
              shows: showsForTheatre,
            });
          }
        }
      });
      response.status(200).send({
        success: true,
        message: "Show Added Successfully",
        data: uniqueTheatres,
      });
    } catch (error) {
      response.status(500).send({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

module.exports = router;
