const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const travel = async function(req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            if(!Array.isArray(json)) {
                return res.status(500).send('Response is not an array');
            }
            if(json.length === 0) {
                return res.status(404).send('No trips found in database');
            }
            res.render('travel', { title: 'Travlr Getaways', trips: json });
        })
        .catch(err => next(err));
};

module.exports = {
    travel
};