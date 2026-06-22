const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
// Regardless of the putcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json({ message: "No trips found" });
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};


// GET /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .findOne({ 'code': req.params.tripCode })
        .exec();

    if(!q) {
        // Database returned no data
        return res
            .status(404)
            .json({ message: "No trip found" });
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};


// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    try {
        const q = await Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res
            .status(201)
            .json(q);
    } catch (err) {
        return res
            .status(400)
            .json({ message: "Error adding trip", error: err.message });
    }
};

module.exports = { 
    tripsList,
    tripsFindByCode,
    tripsAddTrip
};
