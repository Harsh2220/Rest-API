const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/MovieRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

const PORT = 3030;

mongoose
  .connect(
    "mongodb+srv://Harsh:Harsh9080@cluster0.oosw9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(
    app.listen(PORT, () => {
      console.log("server started");
    })
  )
  .catch((err) => {
    console.log(err);
  });
