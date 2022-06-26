const axios = require('axios');

async function geocode(address) {
    const URL = 'https://nominatim.openstreetmap.org/?addressdetails=1&q=' + address + '&format=geocodejson';
    var returnObject = {};
    await axios.get(URL)
        .then(response => {
            if (response.data.features.length === 0)
                return returnObject = {
                    error: 'No results found'
                };
            const body = {
                latitude: response.data.features[0].geometry.coordinates[1],
                longitude: response.data.features[0].geometry.coordinates[0],
                location: response.data.features[0].properties.geocoding.name
            }
            returnObject = body;
        })
        .catch(error => {
            returnObject = error;
        })
    return returnObject;
}

module.exports = geocode