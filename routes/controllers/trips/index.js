const express = require("express");
// const {
//   trip
// } = require('../models/trip');
const tripController = require("./trips");
const router = express.Router();

router.post("/", tripController.createTrip);
router.get("/search", tripController.searchTrips);
router.get("/:limit", tripController.getTripsLimit);
router.get("/detail-trip/:id", tripController.getTripById);
router.get("/", tripController.getTripsAll);
router.put("/:id", tripController.updateTripById);
router.delete("/:id", tripController.deteteTripById);

module.exports = router;
