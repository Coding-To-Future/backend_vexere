const {
  pathStations,
  pathStationsId,
  pathStationsPagni,
  definitionStation,
} = require('./stations');

const { pathTrips, pathTripsId, definitionTrip } = require('./trips');
const { pathTickets, definitionTicket } = require('./tickets');
const {
  pathUsers,
  pathUsersId,
  pathUserLogin,
  pathUserUploadAvatar,
  definitionUser,
} = require('./users');

const keys = require('../../config/index');

module.exports = {
  swagger: '2.0',
  info: {
    description: 'CÁC API ĐẶC TẢ DỰ ÁN VEXERE',
    version: '1.0.0',
    title: 'VeXeRe',
    contact: {
      email: '16119117@student.hcmute.edu.vn',
    },
    license: {
      name: 'Giấy phép chứng nhận dự án',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  host: keys.host,
  basePath: '/api',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Stations',
      description: 'Everything about your Stations',
    },
    {
      name: 'Trips',
      description: 'Everything about your Trips',
    },
    {
      name: 'Tickets',
      description: 'Everything about your Tickets',
    },
    {
      name: 'Users',
      description: 'Everything about your Users',
    },
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/stations': pathStations,
    '/stations/paginated': pathStationsPagni,
    '/stations/{stationId}': pathStationsId,

    '/trips': pathTrips,
    '/trips/{stationId}': pathTripsId,

    '/tickets/booking': pathTickets,

    '/users': pathUsers,
    '/users/{userId}': pathUsersId,
    '/users/login': pathUserLogin,
    '/users/upload-avatar': pathUserUploadAvatar,
  },
  securityDefinitions: {
    token: {
      type: 'apiKey',
      name: 'token',
      in: 'header',
    },
  },
  definitions: {
    Station: definitionStation,
    Trip: definitionTrip,
    Ticket: definitionTicket,
    User: definitionUser,
    Seat: {
      type: 'object',
      required: ['isBooked', 'code'],
      properties: {
        isBooked: {
          type: 'boolean',
        },
        code: {
          type: 'string',
        },
      },
    },
  },
};
