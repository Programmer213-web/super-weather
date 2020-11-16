const path = require('path');
const express = require('express');
const request = require('request');
PORT = 5000;

const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.get('/info', (req, res) => {
    console.log(req.query);

    let newUrl = "http://api.weatherstack.com/current?access_key=8c66886f93b9aa7ae1f8d1a43d75b1b2&query=" + req.query.lat + ',' + req.query.lon;

    request({url: newUrl, json: true}, (error, { body }) => {
        if(!error) {
            res.send(JSON.stringify(body));
        }else{
            res.send(JSON.stringify({error: 'Could not connect'}));
        }
    });
});

app.get('/coords', (req, res) => {
    console.log(req.query);

    let newUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(req.query.address) + ".json?access_token=pk.eyJ1IjoicHJvLWdyYW1tZXIiLCJhIjoiY2tneHdsMmkzMGdsaDJ6cnNuN3Bud3Z3YyJ9.HC6mzNMztu7uHJa1vk_nbw";
    request({url: newUrl, json: true}, (error, { body }) => {
        if(!error) {
            if(body.features && body.features.length > 0) {
                let latitude = body.features[0].center[1];
                let longitude = body.features[0].center[0];
                res.send(JSON.stringify({latitude, longitude, name: body.features[0].place_name}));
            } else{
                res.send(JSON.stringify({error: 'Could not find any such location'}));
            }
        }else{
            res.send(JSON.stringify({error: 'Could not connect'}));
        }
    })
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})