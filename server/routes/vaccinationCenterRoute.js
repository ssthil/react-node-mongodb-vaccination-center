const express = require("express");
const router = express.Router();

const VaccinationCenterModel = require("../models/VaccinationCenterModel");

// POST
router.post("/vaccination-center", (request, response) => {
  if (!request.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  const vaccinationCenter = new VaccinationCenterModel({
    name: request.body.name,
    dailyNurses: request.body.dailyNurses,
    address: request.body.address,
    country: request.body.country,
    operatingHours: request.body.operatingHours,
    allocatedSlots: request.body.allocatedSlots,
  });

  vaccinationCenter
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
});

// GET
router.get("/vaccination-center", (request, response) => {
  VaccinationCenterModel.find()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
});

module.exports = router;
