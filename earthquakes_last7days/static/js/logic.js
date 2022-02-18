// Create basic streets layer
let streetsLayerURLTemplate = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let streetsLayerURLOptions = {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  };
let streets = L.tileLayer(streetsLayerURLTemplate, streetsLayerURLOptions);

// Create satellite streets layer
let satelliteStreetsLayerURLTemplate = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}';
let satelliteStreetsLayerURLOptions = {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  };
let satelliteStreets = L.tileLayer(satelliteStreetsLayerURLTemplate, satelliteStreetsLayerURLOptions);

// create base layer that holds both map layers
// key will be label name in UX
let baseMaps = {
  Streets: streets,
  Satellite: satelliteStreets
};

let map = L.map('mapid', {
  center: [39.5, -98.5],  //center on midpoint of US
  zoom: 3,
  layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

// earthquakes summary format defined in https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(earthquakes).then(function(data) {
  console.log(data);
  L.geoJSON(data).addTo(map);
})

// let myStyle = {
//   color: "blue",
//   weight: 1
// }

// //just add the data points with no labels
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
//   L.geoJSON(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer){
//             console.log(feature);
//             layer.bindPopup(`<h2>${feature.properties.AREA_NAME}</h2>`);
//           }

//     })
//     .addTo(map);
// })
