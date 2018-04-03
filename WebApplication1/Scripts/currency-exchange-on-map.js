var map;
var infowindow;
var pos;

function initMap() {
    var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Twoja lokalizacja');
            infoWindow.open(map);
            map.setCenter(pos);

            var request = {
                location: pos,
                radius: '500',
                query: 'kantor'
            };
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var service = new google.maps.places.PlacesService(map);
    var markerWindow = new google.maps.InfoWindow();
    service.getDetails({
        placeId: place.place_id
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                position: place.geometry.location,
                title: place.name
            });
            google.maps.event.addListener(marker, 'click', function () {
                var content = "<h5><strong>" + place.name + "</strong></h5>"
                  + "<p>" + place.formatted_address + "</p>"
                  + "<p>Tel: " + place.formatted_phone_number + "</p>";

                if (place.website != null) {
                    content += "<a href=\"" + place.website + "\">" + place.website + "</a></br></br>";
                }
                if (place.opening_hours != null) {
                    for (i = 0; i < place.opening_hours.weekday_text.length; i++) {
                        content += "<small>" + place.opening_hours.weekday_text[i] + "</small></br>";
                    }
                }

                markerWindow.setContent(content);
                markerWindow.open(map, this);
            });
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}