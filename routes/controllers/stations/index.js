const express = require('express');
const stationController = require("./stations")
const { authenticate } = require('../../../middlewares/auth');
const router = express.Router();

router.post('/', authenticate, stationController.createStation)
router.get('/', stationController.getStation)
router.get('/:id', stationController.getStationById)
router.put('/:id', authenticate, stationController.updateStationById)
router.delete('/:id', authenticate, stationController.deteteStationById)

module.exports = router;