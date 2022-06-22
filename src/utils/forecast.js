const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude+'&'+'lon='+longitude+'&appid=b1d105d3bdb3584746cc54d0cd2bd598&units=metric'

    // console.log(latitude)
    // console.log(longitude)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod === "400") {
            
            callback('Unable to find location....', undefined)
        } else {
            console.log(body)
            callback(undefined,  ' It is currently ' + body.main.temp + ' degress out. weather : ' + body.weather[0].description )
        }
    })
}

module.exports = forecast