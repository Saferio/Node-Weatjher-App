const request = require('request')

const weatherReport = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b8ec9696a164c21bbe4686aefd03c5b3&query=${latitude},${longitude}&units=m`
        // console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather services", undefined)
        } else if (body.error) {
            callback("Cannot Find Location", undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} .Its ${body.current.temperature}c degree  but it feels like ${body.current.feelslike}c degree here`)
        }
    })
}

module.exports = weatherReport