var lat = undefined;
var lon = undefined;

window.navigator.geolocation.getCurrentPosition( position => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    $.ajax({
        type: 'GET',
        url: `/info?lat=${lat}&lon=${lon}`,
        success: function (data) {
            let obj = JSON.parse(data);
            console.log(obj);
            let locationString = `${obj.location.name}, ${obj.location.region}, ${obj.location.country}`;
            let imgUrl = `${obj.current.weather_icons[0]}`;
            let description = ``;
            obj.current.weather_descriptions.forEach(function (data, i) {
                description += data;
                console.log(i);
                if(i) description += ', ';
            });
            $('.description')[0].innerHTML = description;
            $('.display')[0].src = imgUrl;
            $('.location')[0].innerHTML = locationString;
            $('.temperature')[0].innerText = obj.current.temperature + ' Degree Celcius';
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
});

