const request = require('postman-request')
require('dotenv').config()

const { WEATHER_STACK_ACCESS_TOKEN } = process.env

const forecast = (longitude, latitude, callback) => {
    const WeatherStackURL = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_ACCESS_TOKEN}&query=${latitude}, ${longitude}`
    request({ url: WeatherStackURL, json: true }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to Weather service', undefined)
        } else if (res.statusCode !== 200) {
            callback(`response error: ${res.statusCode}`, undefined)
        } else if (res.body.error) {
            callback('unable for find location of WeatherStack', undefined)
        } else {
            const { location, current } = res.body
            const { region, name, country, localtime } = location
            const {
                weather_descriptions,
                temperature,
                feelslike,
                weather_icons,
            } = current

            const data = {
                location: { region, name, country, localtime },
                current: {
                    weather_descriptions,
                    temperature,
                    feelslike,
                },
                images: weather_icons,
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast
