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
            console.log(body.current.temperature);
            res.send(JSON.stringify(body));
        }else{
            res.send(JSON.stringify({error: 'Could not connect'}));
        }
    });
});

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})