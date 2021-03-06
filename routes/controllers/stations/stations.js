const Station = require('../../../models/Station');

module.exports.createStation = async (req, res, next) => {
    const newStation = new Station(req.body);

    try {
        await newStation.save();
        res.status(201).json(newStation);
    } catch (error) {
        error.status(500).send();
    }
};
/**
 * chưa fix được sort theo unicode
 */
module.exports.getStationPaginatedFilter = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const sort = {};
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    if (endIndex < (await Station.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }

    try {
        results.results = await Station.find(
            req.query.province ? { province: req.query.province } : {}
        )
            .sort(sort)
            .limit(limit)
            .skip(startIndex)
            .exec();
        res.status(200).json(results);
        next();
    } catch (err) {
        res.status(500).send();
    }
};

module.exports.getStationById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const station = await Station.findById(id);
        if (!station) return res.status(404).send();
        res.status(200).json(station);
    } catch (error) {
        error.status(500).send();
    }
};

module.exports.updateStationById = async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'address', 'province'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates!' });

    try {
        const station = await Station.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!station)
            return res.status(404).send({ error: 'Station not found!' });

        res.send(station);
    } catch (e) {
        res.status(500).send();
    }
};

module.exports.deleteStationById = async (req, res, next) => {
    try {
        const station = await Station.findByIdAndDelete(req.params.id);
        if (!station)
            return res.status(404).send({ error: 'Station not found!' });
        res.status(200).json({ message: 'Delete successfully!' });
    } catch (e) {
        res.status(500).send();
    }
};
