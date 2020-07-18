const express = require('express');
const { authenticate, authorize } = require('../../../middlewares/auth');
const ticketController = require('./tickets');

const router = express.Router();

router.post('/booking', authenticate, ticketController.createTicket);
router.get('/me', authenticate, ticketController.getTicket);
router.get('/me/:id', authenticate, ticketController.getTicketById);
router.delete('/me', authenticate, ticketController.deleteTickets);
router.delete('/me/:id', authenticate, ticketController.deleteTicketById);

module.exports = router;
