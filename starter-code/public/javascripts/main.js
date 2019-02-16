window.onload = () => {
  if(document.getElementById('map')) {
    const bounds = new google.maps.LatLngBounds();
    const markers = []
  
    const ironhackSP = {
      lat: -23.56173216,
      lng: -46.6623271
    };
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: ironhackSP
    });
  
    function getPlaces() {
      axios.get("/places/api")
        .then( response => {
          console.log(response.data.places);
          placePlaces(response.data.places);
        })
        .catch(error => {
          console.log(error);
        })
    }

    function getPlace() {
      axios.get(`/places/api/${_ID}`)
        .then( response => {
          console.log(response.data.place);
          placePlaces([response.data.place]);
        })
        .catch(error => {
          console.log(error);
        })
    }
  
    function placePlaces(places){
      places.forEach(function(place){
        console.log(place);
        const center = {
          lat: place.location.coordinates[1],
          lng: place.location.coordinates[0]
        };
        bounds.extend(center);
        const pin = new google.maps.Marker({
          position: center,
          map: map,
          title: place.name
        });
        markers.push(pin);
        map.setCenter(center);
      });

      if(markers.length > 1) {
        map.fitBounds(bounds);
      }
    }
  
    if(typeof _ID == 'undefined') {
      getPlaces();
    } else {
      getPlace();
    }
  }

  if(document.getElementById('getLatLng')){
    const geocoder = new google.maps.Geocoder();

    document.getElementById('getLatLng').addEventListener('click', function () {
      geocodeAddress(geocoder);
    });
    
    function geocodeAddress(geocoder, resultsMap) {
      let address = document.getElementById('address').value;
    
      geocoder.geocode({ 'address': address }, function (results, status) {
    
        if (status === 'OK') {
          document.getElementById('latitude').value = results[0].geometry.location.lat();
          document.getElementById('longitude').value = results[0].geometry.location.lng();
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
};
