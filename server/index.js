const express = require("express");

const cors = require("cors");

const app = express();

const path = require("path");

require("dotenv").config();

require("./config/dbConfig");

const userRoute = require("./routes/userRoutes");
const movieRoute = require("./routes/moviesRoute");
const theatreRoute = require("./routes/theatreRoutes");
const showRoute = require("./routes/showsRoute");
const bookingRoute = require("./routes/bookingRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/theatre", theatreRoute);
app.use("/api/movie", movieRoute);
app.use("/api/show", showRoute);
app.use("/api/bookings", bookingRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(3001, () => {
  console.log("server live on 3001 port");
});
