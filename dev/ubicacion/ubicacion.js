//Necesita https
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


  //Cuadro de Leaflet Maps con la ubicacion actual
  // Podriamos usarlo para seleccionar en el mapa donde esta algo cercano
  // O para preguntar donde se encuentra exactamente
window.onload = function() {
  var map = L.map('map').setView([51.505, -0.09], 13);
  //var map = L.map('map').setView([lat, long], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  //Guia de cosas básicas que pueden sernos útil
  //Marcador de ubicacion:
  var marker = L.marker([51.5, -0.09]).addTo(map);
  
  //Circulo en el mapa
  var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(map);

  //Triangulo en el mapa:
  var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(map);

  //Cajita de texto en el marcador de ubicacion:
  marker.bindTooltip("I am a tooltip.");  
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  circle.bindPopup("I am a circle.");
  polygon.bindPopup("I am a polygon.");

  //Cajita de texto en una ubi del mapa
  var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

  //Funcion, detecta donde tocas en el mapa 
  /*
    function onMapClick(e) {
      alert("You clicked the map at " + e.latlng);
  }
  //Listener al hacer click en el mapa
  map.on('click', onMapClick);
  */

  //Ahora usando un popup
  var popup = L.popup();

  function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
  }

map.on('click', onMapClick);
}

//https://leafletjs.com/examples/quick-start/