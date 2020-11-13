const req = require('request');

var geoFunc = function (city, callback) {
    let address = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + ".json?access_token=pk.eyJ1IjoicHJvLWdyYW1tZXIiLCJhIjoiY2tneHdsMmkzMGdsaDJ6cnNuN3Bud3Z3YyJ9.HC6mzNMztu7uHJa1vk_nbw";
    req({url: address, json: true}, (error, { body }) => {
        if(error) {
            callback('Couldn\'t connect to location service', undefined);
        } else if(body.features.length === 0) {
            callback('No matches for address', undefined);
        }
        else{
            let lat = body.features[0].center[1];
            let lon = body.features[0].center[0];
            let locationObj = {lat: lat, lon: lon, place: body.features[0].place_name};
            callback(undefined, locationObj);
        }
    });
}

module.exports = {
    geoFunc: geoFunc
}