// // We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// // Second tile layer -- dark streets.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create base layer that holds both map layers
// key will be label name in UX
let baseMaps = {
  Day: light,
  Night: dark
};

let map = L.map('mapid', {
  center: [44.0, -80.0],  //center on toronto
  zoom: 2,
  layers: [dark]
});

L.control.layers(baseMaps).addTo(map);

let torontoData = "https://raw.githubusercontent.com/eric-spoerner/mapping-earthquakes/mapping_geojson_linestrings/mapping_geojson_linestrings/static/js/torontoRoutes.json";

let myStyle = {
  color: "#ffffa1",
  weight: 2
}

//just add the data points with no labels
d3.json(torontoData).then(function(data) {
  console.log(data);
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer){
            console.log(feature);
            layer.bindPopup("<h2>Airport code: " + feature.properties.dst + "</h2><hr><h3>Airline name: " + feature.properties.airline + "</h3>");
          }

    }).addTo(map);
})
