$(document).ready(function () {
    $('#cB').on('click', function (e) {
        var tmp = document.querySelector('.msg').innerHTML;
        console.log(tmp);
        setTimeout(function () {
            $('.msg').fadeOut(100);
            $('.msg').html("made by Marco");
            $('.msg').fadeIn(800);
            setTimeout(function () {
                $('.msg').html(tmp);
                initMap();
                fetchFroWeather(myLatLng.lat, myLatLng.lng);
            }, 1000);
        }, 800);
    });

    $('#tB').on('click', function (e) {
        openTwitter($('.msg').html());
    });
    $('#pB').on('click', function (e) {
        //2do  make a pdf
        console.log('hey - make this pdf!');
    });
});


function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            myLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var mapProp = {
                center: new google.maps.LatLng(myLatLng),
                zoom: 6
            };
            var map = new google.maps.Map(document.getElementById('gMap'), mapProp);
            var marker = null;
            addMarkerAndDeleteTheOld(myLatLng);
            fetchFroWeather(myLatLng.lat, myLatLng.lng);

            function addMarkerAndDeleteTheOld(location) {
                if (marker == null)
                    marker = new google.maps.Marker({
                        position: location,
                        map: map
                    });
                else {
                    marker.position = location;
                    marker.map = map;
                    marker.setMap(map);
                }
                google.maps.event.addListener(marker, "click", function (event) {
                    fetchFroWeather(event.latLng.lat(), event.latLng.lng());
                });
            }
            map.addListener('click', function (event) {
                addMarkerAndDeleteTheOld(event.latLng);
            });

        });

    } else {
        console.log("Geolocation is not supported by this browser.");
    }

}

function fetchFroWeather(latitude, longitude, callback) {
    $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude, showIntoPage);
}

function showIntoPage(myJSON, ok) {
    $('.msg').html("Wanna choose another place? <br>Just click on a new one in the <a id='aMap' href='#'> map </a><br>Then click on the marker");
    //console.log(document.querySelector("#gMap").style.visibility);
    $("#aMap" || ".msg").on("click", function (ok) {
        if (document.querySelector("#gMap").style.visibility != "visible")
            document.querySelector("#gMap").style.visibility = "visible";
        else
            document.querySelector("#gMap").style.visibility = "hidden";
        return true;
    });
    var where = "";
    if (!myJSON.name || myJSON.name.length < 1)
        where = "Somewhere not named yet";
    else where = "<br>Country: " + myJSON.sys.country + "<br>Location: " + myJSON.name;
    var unit = "C";

    function cTemp(t, unit, callback) {
        if (unit == "F")
            return Math.round(t * 18 + 320) / 10 + " °F";
        else
            return Math.round(t * 10) / 10 + " °C";
    };

    $("#pos").html("You are at: " + where);
    $("#pos").append("<br> Lat: " + myJSON.coord.lat);
    $("#pos").append(" Lon: " + myJSON.coord.lon);
    $("#weath").html(myJSON.weather[0].main);
    $("#weath").append(" : " + myJSON.weather[0].description);
    $("#weath").append("     <img id='imageId' src='" + myJSON.weather[0].icon + "'height='60' width='70'>");
    var t = cTemp(myJSON.main.temp, unit);
    $("#temp").html("Temp :" + t);
    $("#temp").click(function () {
        if (unit === "C") unit = "F";
        else unit = "C";
        t = cTemp(myJSON.main.temp, unit);
        $(this).html("Temp : " + t);
    });
    $("#info").html("Pressure: " + myJSON.main.pressure);
    $("#info").append("<br>Humidity: " + myJSON.main.humidity);
    $("#info").append("<br>T_min: " + myJSON.main.temp_min + "°C");
    $("#info").append("  T_max: " + myJSON.main.temp_max + "°C");
    $("#info").append("<br>wind: " + myJSON.wind.speed);


    return ok;
}

/*function openTwitter(text) {
    var href = 'https://twitter.com/intent/tweet?url=&via=urNameHere&hashtags=weather&text=';
    // trim & fill
    if (text.length > 108) {
        text = text.slice(0, 105) + '.."';
    }
    text = encodeURIComponent(text);
    window.open(href + text, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}*/

//about PDF
/*var doc = new jsPDF()
doc.text(20, 20, 'Hello world!')
doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
doc.addPage()
doc.text(20, 20, 'Do you like that?')
//kepalle
doc.text(20, 30, document.querySelectorAll( 'body *' ).toString)
console.log(doc);
//doc.save('a4.pdf');*/

