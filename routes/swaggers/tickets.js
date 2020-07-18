const pathTickets = {
  post: {
    tags: ["Tickets"],
    summary: "Booking a new Ticket",
    parameters: [
      {
        name: "Ticket",
        in: "body",
        description: "Ticket with new values of properties",
        required: true,
        schema: {
          type: "object",
          properties: {
            tripId: {
              type: "string"
            },
            seatCodes: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        }
      }
    ],
    responses: {
      "200": {
        description: "New Ticket created",
        schema: {
          $ref: "#/definitions/Ticket"
        }
      },
      "405": { description: "Invalid input" }
    },
    security: [
      {
        token: []
      }
    ]
  }
};

const definitionTicket = {
  type: "object",
  required: ["tripId", "userId", "seats", "totalPrice"],
  properties: {
    tripId: {
      type: "string"
    },
    userId: {
      type: "string"
    },
    seats: {
      $ref: "#/definitions/Seat"
    },
    totalPrice: {
      type: "integer"
    }
  }
};

module.exports = {
  pathTickets,
  definitionTicket
};
