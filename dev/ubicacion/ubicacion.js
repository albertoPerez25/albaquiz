if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        MostrarCoord(position.coords.latitude, position.coords.longitude);
      });
  } 
else {
    document.getElementById('ubi').innerHTML = "Ubicacion no disponible";
  }

  function MostrarCoord(lat, long) {
      document.getElementById('ubi').innerHTML = "Latitud: " + lat + " Longitud: " + long;
  }
