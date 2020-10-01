const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export function createMap() {
  const initialCenter = [3.18, 40.01];

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZmxhdmlvYmVybmFzY29uaSIsImEiOiJjazk5b3Q0amcwMWhhM2ZwN213N3liZ3FtIn0.ByKkoMxbBq27kygkf1KqlA";

  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    center: initialCenter,
    zoom: 3,
    bearing: 27,
    pitch: 45,
  });
}
