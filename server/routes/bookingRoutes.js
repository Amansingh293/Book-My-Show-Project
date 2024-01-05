const router = require("express").Router();

const Booking = require("../model/bookingModel");

const Show = require("../model/showsModel");

const authMiddleware = require("../middleware/authMiddleware");

const stripe = require("stripe")(process.env.stripe_key);

router.post("/make-payment", authMiddleware, async (request, response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: request.body.amount,
      currency: "INR",
    });
    const transactionId = paymentIntent.client_secret;

    response.send({
      success: true,
      message: "Payment successful",
      data: transactionId,
    });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/book-show", authMiddleware, async (request, response) => {
  try {
    const book = new Booking({...request.body , user : request.body.id});
    await book.save();

    const show = await Show.findById(request.body.show);

    await Show.findByIdAndUpdate(request.body.show, {
      bookedSeats: [...show.bookedSeats, ...request.body.seats],
    });

    response
      .status(201)
      .send({ success: true, message: "Show Booked", data: book });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-bookings", authMiddleware, async (request, response) => {
  try {
   
    const bookings = await Booking.find({ user: request.body.id })
    .populate("show")
    .populate({
      path: "show",
      populate: {
        path: "movie",
        model: "movies",
      },
    })
    .populate("user")
    .populate({
      path: "show",
      populate: {
        path: "theatre",
        model: "theatres",
      },
    });
    console.log(bookings);
    response
      .status(201)
      .send({ success: true, message: "Show Booked", data: bookings });
  } catch (error) {
    response.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
