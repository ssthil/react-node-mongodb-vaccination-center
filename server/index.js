const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cors());

// Initialize DB
require("./database/connection")();

// Routes
const RegistrationRoute = require("./routes/regsitrationRoute");
const BookinListRoute = require("./routes/bookingListRoute");
const VaccinationCenterRoute = require("./routes/vaccinationCenterRoute");

app.use("/api", RegistrationRoute);
app.use("/api", BookinListRoute);
app.use("/api", VaccinationCenterRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
  const err = new Error("Could not found");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => console.log("Server started on port " + PORT + "..."));
