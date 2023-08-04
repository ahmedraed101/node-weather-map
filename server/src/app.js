const express = require('express')
const cors = require('cors')
const forecast = require('./utils/forecast')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())

app.get('/api/weather', (req, res) => {
    res.set({
        'Content-Type': 'application/json',
    })
    if (!req.query.lon || !req.query.lat) {
        return res.send({
            error: 'you need to provide a latitude and a longitude query parameters',
        })
    }
    console.log(req.query.lon, req.query.lat)
    forecast(req.query.lon, req.query.lat, console.log)
    res.send({
        location: 'current location',
        current: {
            degree: 32,
            feels_like: 33,
        },
        image: 'link/to/image',
        images_link: 'link/to/images',
    })
})

app.listen(PORT, () => console.log(`live on port ${PORT}`))
