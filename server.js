require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
app.use(cors());


app.get('/location', (request, response) => {
    try {
        const locationData = searchToLatLong(request.query.data);
        response.send(locationData);
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Status: 500. Sorry, something went wrong');
    }
});

function searchToLatLong(query) {
    const geoData = require('./data/geo.json');
    const location = new Location(query, geoData)
    return location;
}

function Location(query, geoData) {
    this.search_query = query;
    this.formatted_query = geoData.results[0].formatted_address;
    this.latitude = geoData.results[0].geometry.location.lat;
    this.longitude = geoData.results[0].geometry.location.lng;
}

// const forecastArr = [];
// // app.get('data/darksky.json')
// //         .then(weatherObjects => {
// //             weatherObjects.forEach(forecast => forecastArr.push(new Location(query, geoData)));
// //     })

app.get('/weather', (request, response) => {
    try {
        const weatherData = searchForecast(request.query.data);
        response.send(weatherData);

    }
    catch (error) {
        console.log(error);
        response.status(500).send('Status: 500. Sorry, something went wrong');
    }
});

function searchForecast (query) {
    const weatherData = require('./data/darksky.json');
    // weatherData.forEach( () => forecastArr.push(new Location(query, weatherData)))
    // request.send(forecastArr)
    const forecast = new Forecast(query, weatherData)
    return forecast;
}

function Forecast(query, weatherData) {
    this.search_query = query;
    this.Forecast = weatherData.hourly.summary;
    this.Time = weatherData.hourly.data[0].time;
}

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));