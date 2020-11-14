const { request } = require('https');
const req = require('request');
const yargs = require('yargs'); 
const { geoFunc } = require('./utils/geocode.js');

yargs.command({
    command: 'find-weather',
    describe: 'Find the weather for a particular place',
    builder: {
        city: {
            describe: 'Find weather of here',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        let city = argv.city;
        let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + ".json?access_token=pk.eyJ1IjoicHJvLWdyYW1tZXIiLCJhIjoiY2tneHdsMmkzMGdsaDJ6cnNuN3Bud3Z3YyJ9.HC6mzNMztu7uHJa1vk_nbw";

        geoFunc(city, (error, {lat:latitude, lon:longitude, place:location} = {}) => {
            if(error) {
                console.log(error);
            } 
            else
            {
                let newUrl = "http://api.weatherstack.com/current?access_key=8c66886f93b9aa7ae1f8d1a43d75b1b2&query=" + latitude + ',' + longitude;

                req({url: newUrl, json: true}, (error, { body }) => {
                    if(error) {
                        console.log('Sorry, an error occurred while connecting to the network.');
                    }
                    else if(body.error) {
                        console.log('Sorry, the coordinates were incorrect.');
                    }
                    else{
                        console.log(location);
                        console.log('Temperature - ' + body.current.temperature);
                        console.log('Weather description - ' + body.current.weather_descriptions[0]);
                    }
                });
            }
        })
    }
});

yargs.parse();
