const { pathStations, pathStationsId, definitionStation, definitionStations } = require('./stations');
const keys = require('../../config/index');

module.exports = {
    swagger: '2.0',
    // host: 'localhost:6789',
    host: keys.host,
    basePath: '/api',
    // schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    paths: {
        '/stations': pathStations, //dinh nghix phuognt thuc
        '/stations/{stationId}': pathStationsId
    },
    definitions: {
        Station: definitionStation, //dinh nghix skima, doi tuong dang don
        Stations: definitionStations
    }
}