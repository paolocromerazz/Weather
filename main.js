$(document).ready(function () {
    $('.coffee-button').on('click', function (e) {
        $('.msg').html("made by Marco");
        alert("asdf");
    });
    $('.twitter-share-button').on('click', function (e) {
        openTwitter($('.msg').html());
        $('.msg').html("sent");
    });

    function initMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var mapProp = {
                    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    zoom: 5
                };
            });
            var map = new google.maps.Map(document.getElementById('gMap'), mapProp);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

    }

});




function openTwitter(text) {
    var href = 'https://twitter.com/intent/tweet?url=&via=urNameHere&hashtags=weather&text=';
    // trim & fill
    if (text.length > 108) {
        text = text.slice(0, 105) + '.."';
    }
    text = encodeURIComponent(text);
    window.open(href + text, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}



/*$( document ).ready(function(){


  $("#tempunit").click(function () {
    var currentTempUnit = $("#tempunit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
  
})*/
