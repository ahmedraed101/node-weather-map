const express = require('express')
const cors = require('cors')
const forecast = require('./utils/forecast')
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

if (process.env.ALLOWED_CORS) {
    console.log('yes')
    app.use(
        cors({
            origin: process.env.ALLOWED_CORS,
            optionsSuccessStatus: 200,
        })
    )
} else {
    app.use(cors())
}

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
    forecast(req.query.lon, req.query.lat, (error, data) => {
        if (error) {
            console.log(error)
            return res.send({ error })
        }
        res.send(data)
    })
})

app.listen(PORT, () => console.log(`live on port ${PORT}`))
