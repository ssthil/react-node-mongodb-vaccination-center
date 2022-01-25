const express = require("express");
const router = express.Router();

const RegistrationModel = require("../models/RegistrationModel");
// GET
router.get("/booking-list", (request, response) => {
  RegistrationModel.find()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
});

// GET ONE
router.get("/booking-list/:id", (request, response) => {
  const id = request.params.id;
  RegistrationModel.findById(id)
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      response.status(400).json(err);
    });
});

// Delete
router.delete("/booking-list/:id", (req, res) => {
  RegistrationModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id ${_id}.`,
        });
      }
      return res.send({
        message: "User was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + _id,
      });
    });
});

module.exports = router;
