var lat = undefined;
var lon = undefined;

window.navigator.geolocation.getCurrentPosition(position => {
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
            console.log(obj.current.temperature);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
});

