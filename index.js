const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/MovieRoutes");
require("dotenv/config");

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

mongoose
  .connect(process.env.DB)
  .then(
    app.listen(process.env.PORT, () => {
      console.log("server started");
    })
  )
  .catch((err) => {
    console.log(err);
  });
