// // We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// // Second tile layer -- dark streets.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create base layer that holds both map layers
// key will be label name in UX
let baseMaps = {
  Streets: streets,
  'Satllite Streets': satelliteStreets
};

let map = L.map('mapid', {
  center: [43.7, -79.3],  //center on toronto
  zoom: 11,
  layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

let torontoHoods = "https://raw.githubusercontent.com/eric-spoerner/mapping-earthquakes/mapping_geojson_polygons/mapping_geojson_polygons/static/js/torontoNeighborhoods.json";

let myStyle = {
  color: "blue",
  weight: 1
}

//just add the data points with no labels
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer){
            console.log(feature);
            layer.bindPopup(`<h2>${feature.properties.AREA_NAME}</h2>`);
          }

    })
    .addTo(map);
})
