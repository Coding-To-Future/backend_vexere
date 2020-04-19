const express = require('express');
const stationController = require('./stations');
const { authenticate } = require('../../../middlewares/auth');
const router = express.Router();

router.post('/', authenticate, stationController.createStation);
router.get('/paginated', stationController.getStationPaginated);
router.get('/', stationController.getStation);
router.get('/:id', stationController.getStationById);
router.patch('/:id', authenticate, stationController.updateStationById);
router.delete('/:id', authenticate, stationController.deteteStationById);

module.exports = router;
