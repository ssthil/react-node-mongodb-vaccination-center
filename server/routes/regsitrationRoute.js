const express = require("express");
const router = express.Router();

const RegistrationModel = require("../models/RegistrationModel");

// POST
router.post("/registration", (request, response) => {
  if (!request.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  const query = request.body.fullName;
  RegistrationModel.findOne({ fullName: query }, function (err, isRegistered) {
    if (err) console.log(err);
    if (isRegistered) {
      response
        .status(409)
        .send({ message: `This user ${query} has already been registered!` });
      console.log(`This user ${query} has already been registered`);
    } else {
      const registration = new RegistrationModel({
        nricNumber: request.body.nricNumber,
        fullName: request.body.fullName,
        vaccinationCenter: request.body.vaccinationCenter,
        bookingDate: request.body.bookingDate,
      });

      registration
        .save()
        .then((data) => {
          response.json(data);
        })
        .catch((err) => {
          response.status(400).json(err);
        });
    }
  });
});

//PATCH
router.patch("/registration/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const update = await RegistrationModel.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    const data = await update.save();
    if (!data) {
      return response.status(404).send();
    }

    response.json(data);
  } catch (err) {
    response.status(500).json(err);
  }
});

module.exports = router;
