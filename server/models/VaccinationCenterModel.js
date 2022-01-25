const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vaccinationCenterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dailyNurses: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  operatingHours: {
    type: String,
    required: true,
  },
  allocatedSlots: {
    type: Number,
    required: true,
  },
});

const VaccinationCenter = mongoose.model(
  "vaccination_center",
  vaccinationCenterSchema
);
module.exports = VaccinationCenter;
