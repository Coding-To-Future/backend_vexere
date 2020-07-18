const pathTrips = {
  post: {
    tags: ["Trips"],
    summary: "Create new trip",
    parameters: [
      {
        name: "trip",
        in: "body",
        description: "Trip with new values of properties",
        required: true,
        schema: {
          $ref: "#/definitions/Trip"
        }
      }
    ],
    responses: {
      "200": {
        description: "New trip created",
        schema: {
          $ref: "#/definitions/Trip"
        }
      },
      "405": { description: "Invalid input" }
    }
  },
  get: {
    tags: ["Trips"],
    summary: "Get all trips",
    responses: {
      "200": {
        description: "OK",
        schema: {
          $ref: "#/definitions/Trip"
        }
      }
    }
  }
};

const pathTripsId = {
  parameters: [
    {
      name: "tripId",
      in: "path",
      required: true,
      description: "ID of trip that we want to find",
      type: "string"
    }
  ],
  get: {
    tags: ["Trips"],
    summary: "Get trip with given ID",
    responses: {
      "200": {
        description: "Trip is found",
        schema: {
          $ref: "#/definitions/Trip"
        }
      }
    }
  },
  delete: {
    summary: "Delete trip with given ID",
    tags: ["Trips"],
    responses: {
      "200": {
        description: "Trip is deleted",
        schema: {
          $ref: "#/definitions/Trip"
        }
      }
    }
  },
  put: {
    summary: "Update trip with give ID",
    tags: ["Trips"],
    parameters: [
      {
        name: "trip",
        in: "body",
        description: "Trip with new values of properties",
        schema: {
          $ref: "#/definitions/Trip"
        }
      }
    ],
    responses: {
      "200": {
        description: "Trip is updated",
        schema: {
          $ref: "#/definitions/Trip"
        }
      }
    }
  }
};

const definitionTrip = {
  type: "object",
  required: ["fromStation", "toStation", "startTime", "seats", "price"],
  properties: {
    fromStation: {
      type: "string"
    },
    toStation: {
      type: "string"
    },
    startTime: {
      type: "string"
    },
    seats: {
      type: "string"
    },
    price: {
      type: "integer"
    }
  }
};

module.exports = {
  pathTrips,
  pathTripsId,
  definitionTrip
};
