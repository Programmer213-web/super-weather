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
            let locationString = `${obj.location.name}, ${obj.location.region}, ${obj.location.country}`;
            let imgUrl = `${obj.current.weather_icons[0]}`;
            let description = ``;
            obj.current.weather_descriptions.forEach(function (data, i) {
                description += data;
                if(i && i != data.length - 1) description += ', ';
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

$('.find').click(function () {
    let searchbox = `.search${$(this).attr('tag')}`;
    let location = $(searchbox + ' input')[0].value;
    $.ajax({
        type: 'GET',
        url: `/coords?address=${location}`,
        success: function (data) {
            let obj = JSON.parse(data);
            if(obj.error){
                $(searchbox + ' .temperature').innerText = obj.error;
            } else{
                $.ajax({
                    type: 'GET',
                    url: `/info?lat=${obj.latitude}&lon=${obj.longitude}`,
                    success: function (data) {
                        let inobj = JSON.parse(data);
                        $(searchbox + ' .name')[0].innerText = obj.name;
                        $(searchbox + ' .temperature')[0].innerText = inobj.current.temperature + ' Degree Celcius';
                        let description = '';
                        inobj.current.weather_descriptions.forEach(function (desc, index) {
                            description += desc;
                            if(index && index < inobj.current.weather_descriptions.length - 1) description += ', ';
                        });
                        $(searchbox + ' .description')[0].innerText = description;
                        $(searchbox + ' .display')[0].src = inobj.current.weather_icons[0];
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                })
            }
        }, 
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
});

