const express = require('express');
const { authenticate, authorize } = require('../../../middlewares/auth')
const ticketController = require("./tickets")

const router = express.Router();

router.post('/booking', authenticate, ticketController.createTicket)

module.exports = router;