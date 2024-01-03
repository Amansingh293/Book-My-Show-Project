const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const Theatre = require("../model/theatreModel");

router.post("/add-theatre", authMiddleware, async (request, response) => {
  try {
    // const existing = await Theatre({ address: request.body.address });

    // if (existing) {
    //   response
    //     .status(200)
    //     .send({ success: true , message: "Theatre Already Present !!" });
    // }
    const theatre = new Theatre(request.body);

    await theatre.save();

    response
      .status(201)
      .send({ success: true, message: "Theatre Added Successfully" });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.post(
  "/get-theatres-by-owner-id",
  authMiddleware,
  async (request, response) => {
    try {
      const allTheatres = await Theatre.find({ owner: request.body.id });

      response.status(200).send({
        success: true,
        message: "Theatre Added Successfully",
        data: allTheatres,
      });
    } catch (err) {
      console.log(err.message);
      response
        .status(500)
        .send({ success: true, message: "Internal Server Error" });
    }
  }
);

router.put("/edit-theatre", authMiddleware, async (request, response) => {
  try {
    const currentTheatre = await Theatre.findByIdAndUpdate(
      request.body._id,
      request.body
    );
    console.log(currentTheatre);

    response.status(200).send({
      success: true,
      message: "Theatre Editted Successfully",
    });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.delete("/delete-theatre", authMiddleware, async (request, response) => {
  try {
    await Theatre.findByIdAndDelete(request.query.theatreId);

    response.status(200).send({
      success: true,
      message: "Theatre Deleted Successfully",
    });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.get("/get-all-theatres", authMiddleware, async (_, response) => {
  try {
    const allTheatres = await Theatre.find().select("-owner");

    response.status(200).send({
      success: true,
      message: "All Theatres Retrieved",
      data: allTheatres,
    });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

router.put("/change-theatre-status", authMiddleware, async (request, response) => {
  try {
    await Theatre.findByIdAndUpdate({_id: request.body._id} , request.body);

    response.status(200).send({
      success: true,
      message: "Status Changed Successfully"
    });
  } catch (err) {
    console.log(err.message);
    response
      .status(500)
      .send({ success: true, message: "Internal Server Error" });
  }
});

module.exports = router;
