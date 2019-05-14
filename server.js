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

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));