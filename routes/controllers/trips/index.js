const express = require('express');
// const {
//   trip
// } = require('../models/trip');
const tripController = require("./trips")
const router = express.Router();

router.post('/', tripController.createTrip)
router.get('/', tripController.getTrips)
router.get('/:id', tripController.getTripById)
router.put('/:id', tripController.updateTripById)
router.delete('/:id', tripController.deteteTripById)

module.exports = router;