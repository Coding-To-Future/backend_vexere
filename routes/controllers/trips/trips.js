const {
    Trip
} = require('../../../models/Trip');
const {
    Seat
} = require('../../../models/Seat')
const seatCodes = [
    'A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'A07', 'A08', 'A09', 'A10', 'A11', 'A12',
    'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B11', 'B12'
]
module.exports.createTrip = (req, res, next) => {
    const { fromStation, toStation, startTime, price } = req.body;
    const newTrip = new Trip({ fromStation, toStation, startTime, price })
    seatCodes.forEach(code => {
        const newSeat = new Seat({ code })
        newTrip.seats.push(newSeat)
    })
    //khong dung mang vi o day muon no la doi tuong code va is book nua
    newTrip.save()
        .then(trip => res.status(201).json(trip))
        .catch(err => res.status(500).json(err))
}

module.exports.getTrips = (req, res, next) => {
    Trip.find()
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(500).json(err))
}

module.exports.getTripById = (req, res, next) => {
    const { id } = req.params;
    Trip.findById(id)
        .then(trip => res.status(200).json(trip))
        .catch(err => res.status(500).json(err))
}

module.exports.updateTripById = (req, res, next) => {
    const { id } = req.params;
    const { fromStation, toStation, startTime, price } = req.body; //ket qua nhap vao tu nguoi dung
    Trip.findById(id)
        .then(trip => {
            if (!trip) return Promise.reject({
                status: 404,
                message: "Not found"
            })
            trip.fromStation = fromStation;
            trip.toStation = toStation;
            trip.startTime = startTime;
            trip.price = price;

            return trip.save()
        })
        .then(trip => res.status(200).json(trip))
        .catch(err => {
            if (err.status) return status(res.status).json({
                message: err.message
            })
            return res.status(500).json(err)
        })
}
module.exports.deteteTripById = (req, res, next) => {
    const { id } = req.params;
    Trip.deleteOne({ _id: id })
        .then((result => {
            if (result.n === 0) return Promise.reject({
                status: 400,
                message: "Not found"
            })
            res.status(200).json({ message: "Delete successfully" })
        }))
        .catch(err => {
            if (err.status) return res.status(err.status).json({
                message: err.message
            })
            return res.status(500).json(err)
        })
}
