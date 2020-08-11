const express = require("express");
const { authenticate, authorize } = require("../../../middlewares/auth");
const ticketController = require("./tickets");

const router = express.Router();

router.post("/booking", authenticate, ticketController.createTicket);
router.get("/me", authenticate, ticketController.getTicket);
router.get("/me/:id", authenticate, ticketController.getTicketById);
router.delete("/me", authenticate, ticketController.deleteTickets);
router.delete("/delete/:id", authenticate, ticketController.deleteTicketById);
router.get("/all", authenticate, authorize("admin"), ticketController.getAllTicket);

module.exports = router;
