const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  nricNumber: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  vaccinationCenter: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
});

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;
