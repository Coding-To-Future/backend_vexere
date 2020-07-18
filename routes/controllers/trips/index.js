const express = require('express');
const tripController = require('./trips');
const router = express.Router();
const { authenticate, authorize } = require('../../../middlewares/auth');

router.post('/', authenticate, authorize('admin'), tripController.createTrip);
router.get('/search', tripController.searchTrips);
router.get('/:limit', tripController.getTripsLimit);
router.get('/detail-trip/:id', tripController.getTripById);
router.get('/', tripController.getTripsAll);
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  tripController.updateTripById
);
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  tripController.deleteTripById
);

module.exports = router;
