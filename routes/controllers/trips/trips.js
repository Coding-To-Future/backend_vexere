const Trip = require("../../../models/Trip");
const { Seat } = require("../../../models/Seat");
// const moment = require('moment');

const seatCodes = [
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
  "A11",
  "A12",
  "B01",
  "B02",
  "B03",
  "B04",
  "B05",
  "B06",
  "B07",
  "B08",
  "B09",
  "B10",
  "B11",
  "B12",
];

module.exports.createTrip = (req, res, next) => {
  const { fromStation, toStation, startTime, price } = req.body;
  const newTrip = new Trip({ fromStation, toStation, startTime, price });
  seatCodes.forEach((code) => {
    const newSeat = new Seat({ code });
    newTrip.seats.push(newSeat);
  });
  //khong dung mang vi o day muon no la doi tuong code va is book nua
  newTrip
    .save()
    .then(async (trip) => {
      let id = trip._id;
      const newTrip = await Trip.findById(id).populate("fromStation").populate("toStation");
      return res.status(201).json(newTrip);
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.getTripsLimit = (req, res, next) => {
  const { limit } = req.params;
  Trip.find()
    .limit(parseInt(limit))
    .populate("fromStation")
    .populate("toStation")
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(500).json(err));
};

module.exports.getTripsAll = (req, res, next) => {
  Trip.find()
    .populate("fromStation")
    .populate("toStation")
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(500).json(err));
};

module.exports.getTripById = (req, res, next) => {
  const { id } = req.params;
  Trip.findById(id)
    .populate("fromStation")
    .populate("toStation")
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(500).json(err));
};

module.exports.updateTripById = async (req, res, next) => {
  const { id } = req.params;
  const { fromStation, toStation, startTime, price } = req.body;
  try {
    const query = Trip.findById(id);
    const trip = await query;
    if (!trip)
      return {
        status: 404,
        message: "Not found",
      };
    trip.fromStation = fromStation;
    trip.toStation = toStation;
    trip.startTime = startTime;
    trip.price = price;

    await trip.save();
    const rs = await query.populate("fromStation").populate("toStation");
    return res.status(200).json(rs);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports.deleteTripById = (req, res, next) => {
  const { id } = req.params;
  Trip.deleteOne({ _id: id })
    .then((result) => {
      if (result.n === 0)
        return Promise.reject({
          status: 400,
          message: "Not found",
        });
      res.status(200).json({ message: "Delete successfully" });
    })
    .catch((err) => {
      if (err.status)
        return res.status(err.status).json({
          message: err.message,
        });
      return res.status(500).json(err);
    });
};

module.exports.searchTrips = async (req, res, next) => {
  const fromProvince = req.query.fromProvince;
  const toProvince = req.query.toProvince;
  const startTime = req.query.startTime;
  try {
    const trip = await Trip.find({ startTime: { $gte: startTime } })
      .populate({
        path: "fromStation",
        match: { province: fromProvince },
      })
      .populate({ path: "toStation", match: { province: toProvince } });

    const tripReal = trip.filter((trip) => trip.fromStation !== null && trip.toStation !== null);

    if (tripReal.length === 0)
      return res.status(404).send({ message: "Sorry! We don't have trip for you." });

    res.status(200).send(tripReal);
  } catch (e) {
    res.status(500).send(e);
  }
};
