const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

const tripsList = async(req, res) => {
    const q = await Model.find({}).exec();
    if(!q) {
        return res.status(404).json({ message: "No trips found" });
    } else {
        return res.status(200).json(q);
    }
};

const tripsFindByCode = async(req, res) => {
    const q = await Model.findOne({ 'code': req.params.tripCode }).exec();
    if(!q) {
        return res.status(404).json({ message: "No trip found" });
    } else {
        return res.status(200).json(q);
    }
};

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
        return res.status(201).json(q);
    } catch (err) {
        return res.status(400).json({ message: "Error adding trip", error: err.message });
    }
};

// PUT: /trips/:tripCode - Updates an existing Trip
const tripsUpdateTrip = async(req, res) => {
    try {
        const q = await Model
            .findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            )
            .exec();

        if (!q) {
            return res.status(400).json({ message: "No trip found to update" });
        } else {
            return res.status(201).json(q);
        }
    } catch (err) {
        return res.status(400).json({ message: "Error updating trip", error: err.message });
    }
};

module.exports = { 
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
