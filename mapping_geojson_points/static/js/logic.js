// // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
  Street: streets,
  Dark: dark
};

let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

let airportData = "https://raw.githubusercontent.com/eric-spoerner/mapping-earthquakes/mapping_geojson_points/mapping_geojson_points/static/js/majorAirports.json";

//just add the data points with no labels
// d3.json(airportData).then(function(data) {
//   console.log(data);
//   L.geoJSON(data).addTo(map);
// })

//add the data points with labels attached.
d3.json(airportData).then(function(data) {
  console.log(data);
  L.geoJSON(data, {
    onEachFeature: function(feature, layer){
      console.log(feature);
      layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2><hr><h3>Airport name: " + feature.properties.name + "</h3>");
    }}).addTo(map);
});

// console.log(airportData);

//slegacy code for adding a single geojson map

// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

//syntax number 1 for adding labels to a map.
// L.geoJSON(sanFranAirport, {
//   //turn each feature into a marker on the map
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//             .bindPopup("<h2>" + feature.properties.city + "</h2>");
//   }
// }).addTo(map);

//syntax number 2 for adding labels to a map
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2><hr><h3>Airport name: " + feature.properties.name + "</h3>");
//   }
// }).addTo(map);
//streets.addTo(map);