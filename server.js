'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000
    // app.use(express.static('./'));


app.get('/location', locationHandler)

function locationHandler(req, res) {
    let locationData = getlocation(req.query.data)
    res.status(200).json(locationData);

}

function getlocation(city) {
    let locations = require('./data/geo.json');
    return new Location(city, locations);

}

function Location(city, data) {
    this.search_qurey = city,
        this.formatted_address = data.results[0].formatted_address,
        this.lat = data.results[0].geometry.location.lat,
        this.lng = data.results[0].geometry.location.lng
}

app.get('/weather', weatherHandler)

function weatherHandler(req, res) {
    let weatherData = getweather(req.query.data)
    res.status(200).json(weatherData)
}

function getweather(city) {
    let weather = require('./data/darksky.json')
    return weather.daily.data.map((day => {
        return new Weather(day)
    }))
}

function Weather(day) {
    this.forcast = day.summary,
        this.time = new Date(day.time * 1000).toDateString()
}


app.get('/', (req, res) => {
    res.status(200).send('great jop ')
})
app.get('/boo', (req, res) => {
    throw new Error('poo')
})
app.use('*', (req, res) => {
    res.status(404).send('not found!!')
})
app.use((error, req, res) => {
    res.status(500).send(error)
})


app.listen(PORT, () => console.log(`listen on ${PORT}`))