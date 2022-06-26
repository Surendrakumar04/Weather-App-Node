const axios = require('axios');

async function forecast(latitude, longitude) {
    const URL = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude+'&'+'lon='+longitude+'&appid=b1d105d3bdb3584746cc54d0cd2bd598&units=metric';
    var returnObject = {};
    await axios.get(URL)
        .then(response => {
            const body = {
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
            }
            returnObject = body;
        })
        .catch(error => {
            returnObject = error;
        })
    return returnObject;
}

module.exports = forecast