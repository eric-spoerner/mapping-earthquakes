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

// Create satellite streets layer
let darkLayerURLTemplate = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}';
let darkLayerURLOptions = {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  };
let dark = L.tileLayer(darkLayerURLTemplate, darkLayerURLOptions);

// create base layer that holds both map layers
// key will be label name in UX
let baseMaps = {
  Streets: streets,
  Satellite: satelliteStreets,
  Dark: dark
};

let map = L.map('mapid', {
  center: [39.5, -98.5],  //center on midpoint of US
  zoom: 3,
  layers: [streets]
});

// init earthquake layer
let earthquakes = new L.layerGroup();
let tectonicPlates = new L.layerGroup();
let majorQuakes = new L.layerGroup();

//add to overlays object
let overlays = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates,
  "Major Earthquakes": majorQuakes
}

//add map layer and overlay layer to map object 
L.control.layers(baseMaps, overlays).addTo(map);

// earthquakes summary format defined in https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let tectonicPlateData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
let majorQuakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

// determine style for each marker.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
};

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
};

function getColor(magnitude) {
  if (magnitude > 6) {
    return "#990000";
  }
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
};

//extract json, map individual points to circle marker using style params, and add popup label
d3.json(earthquakeData).then(function(data) {
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng){  //is latlng a native param of leaflet that translates geojson coords?
      return L.circleMarker(latlng)},
    style: styleInfo,
    onEachFeature: function(feature, layer){
      layer.bindPopup(`<h2>Magnitude: ${feature.properties.mag}</h2><hr><h3>Location: ${feature.properties.place}</h3>`)
    }
  }).addTo(earthquakes); // add all markers etc to earthquake layer
  earthquakes.addTo(map); // add quake layer to map.
});

//add map legend
let legend = L.control({position: 'bottomright'});

legend.onAdd = function(){

    let div = L.DomUtil.create('div', 'info legend') //use DOMUtil to add div element to index.html dynamically
        const magnitudes = [0, 1, 2, 3, 4, 5, 6];
        const colors = [
          "#98ee00",
          "#d4ee00",
          "#eecc00",
          "#ee9c00",
          "#ea822c",
          "#ea2c2c",
          "#990000"
        ];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
        //? is conditional operator -- condensed if statement:
        //condition ? ifTrue : ifFalse
        //if not last value in array, return "1-2" type value, else return "5+" value type
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

//map tectonic plate data
let plateStyle = {
  color: "red",
  weight: "4"
}

d3.json(tectonicPlateData).then(function(data) {
  L.geoJSON(data, {
    style: plateStyle
  }).addTo(tectonicPlates);
  tectonicPlates.addTo(map);
});

//map major earthquake data
d3.json(majorQuakeData).then(function(data) {
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng){  //is latlng a native param of leaflet that translates geojson coords?
      return L.circleMarker(latlng)},
    style: styleInfo,
    onEachFeature: function(feature, layer){
      layer.bindPopup(`<h2>Magnitude: ${feature.properties.mag}</h2><hr><h3>Location: ${feature.properties.place}</h3>`)
    }
  }).addTo(majorQuakes); // add all markers etc to earthquake layer
  majorQuakes.addTo(map); // add quake layer to map.
});