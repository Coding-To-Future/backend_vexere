const express = require('express');
// const {
//   Station
// } = require('../models/Station');
//require nao de truoc thi chay truoc
const stationRouter = require('./controllers/stations/index')
const tripRouter = require('./controllers/trips/index')
const userRouter = require('./controllers/users/index')
const ticketRouter = require('./controllers/tickets/index')

const router = express.Router();

router.use('/stations', stationRouter)
router.use('/trips', tripRouter)
router.use('/users', userRouter)
router.use('/tickets', ticketRouter)

module.exports = router;