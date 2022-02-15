console.log("working"); // confirm access to js script

let map = L.map('mapid').setView([40.7, -94.5], 4) //lat,long,zoom

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Add a marker for Los Angeles.
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
// L.circle([34.0522, -118.2437], {
//     radius: 300,
//     color: 'yellow'
// }).addTo(map);

// L.circleMarker([34.0522, -118.2437], {
//     radius: 300,
//     color: 'black',
//     fillColor: '#ffffa1'
// }).addTo(map);

// get data from cities.js.  needs to also be called in the HTML!
let cityData = cities;

// Loop through each city in the cities object and create a marker for each.
cityData.forEach(function(city){
    console.log(city);
    L.circleMarker(city.location, {
      radius: city.population/100000
    })
    .bindPopup("<h2>" + city.city + "," + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
    .addTo(map);
});