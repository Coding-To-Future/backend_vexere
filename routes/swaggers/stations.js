const pathStations = {
  post: {
    tags: ["Stations"],
    summary: "Create new station",
    parameters: [
      {
        name: "station",
        in: "body",
        description: "Station with new values of properties",
        required: true,
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    ],
    responses: {
      "200": {
        description: "New station created",
        schema: {
          $ref: "#/definitions/Station"
        }
      },
      "405": { description: "Invalid input" }
    },
    security: [
      {
        token: []
      }
    ]
  },
  get: {
    tags: ["Stations"],
    summary: "Get all stations",
    responses: {
      "200": {
        description: "OK",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    }
  }
};

const pathStationsPagni = {
  get: {
    tags: ["Stations"],
    summary: "Get stations paginations",
    parameters: [
      {
        name: "page",
        in: "query",
        description: "page current",
        required: true,
        type: "integer"
      },
      {
        name: "limit",
        in: "query",
        description: "limit page display",
        required: true,
        type: "integer"
      }
    ],
    responses: {
      "200": {
        description: "OK",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    }
  }
};

const pathStationsId = {
  parameters: [
    {
      name: "stationId",
      in: "path",
      required: true,
      description: "ID of station that we want to find",
      type: "string"
    }
  ],
  get: {
    tags: ["Stations"],
    summary: "Get station with given ID",
    responses: {
      "200": {
        description: "Station is found",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    }
  },
  delete: {
    summary: "Delete station with given ID",
    tags: ["Stations"],
    responses: {
      "200": {
        description: "Station is deleted",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    },
    security: [
      {
        token: []
      }
    ]
  },
  put: {
    summary: "Update station with give ID",
    tags: ["Stations"],
    parameters: [
      {
        name: "station",
        in: "body",
        description: "Station with new values of properties",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    ],
    responses: {
      "200": {
        description: "Station is updated",
        schema: {
          $ref: "#/definitions/Station"
        }
      }
    },
    security: [
      {
        token: []
      }
    ]
  }
};

const definitionStation = {
  type: "object",
  required: ["name", "address", "province"],
  properties: {
    name: {
      type: "string"
    },
    address: {
      type: "string"
    },
    province: {
      type: "string"
    }
  }
};

module.exports = {
  pathStations,
  pathStationsId,
  pathStationsPagni,
  definitionStation
};
