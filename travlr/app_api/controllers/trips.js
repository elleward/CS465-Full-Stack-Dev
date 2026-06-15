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

    // Uncomment the following lines to show results of query
    // on the console
    // console.log(q);

    if(!q)
    { // Database returned no data
        return res
            .status(404)
            .json({ message: "No trips found" });
    } else { // Return resulting trip list}
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

    // Uncomment the following lines to show results of query
    // on the console
    // console.log(q);

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

module.exports = { 
    tripsList,
    tripsFindByCode   
};