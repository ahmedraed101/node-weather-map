const request = require('postman-request')
require('dotenv').config()

const { WEATHER_API_ACCESS_TOKEN } = process.env

const forecast = (longitude, latitude, callback) => {
    const WeatherapiURL = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_ACCESS_TOKEN}&q=${latitude},${longitude}`
    request({ url: WeatherapiURL, json: true }, (err, res, body) => {
        if (err) {
            callback('Unable to connect to Weather service', undefined)
        } else if (res.statusCode !== 200) {
            callback(`response error: ${res.statusCode}`, undefined)
        } else if (res.body.error) {
            callback('unable for find location of WeatherAPI', undefined)
        } else {
            const { location, current } = res.body
            const { region, name, country, localtime } = location
            const {
                condition: { text: weather_description, icon: weather_icon },
                temp_c: temperature,
                feelslike_c: feelslike,
            } = current

            const data = {
                location: { region, name, country, localtime },
                current: {
                    weather_description,
                    temperature,
                    feelslike,
                },
                image: weather_icon,
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast
