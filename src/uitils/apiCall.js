import ky from "ky";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const accessKey = "k7WafyB240GbvXdwJ5wgeCq4LiceFjnY";
const limitEvents = 200;

const eventsEndPoint = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${accessKey}&locale=*&countryCode=US&size=${limitEvents}&sort=date,asc`;
export const getEventsInfo = () => {
  return ky.get(eventsEndPoint).json();
};

export function getInfoVenues(dataset) {
  const infoEvent = dataset._embedded.events.map((event) => {
    const {
      id: idVenue,
      name: nameVenue,
      city,
      location,
    } = event._embedded.venues[0];

    let coordinatesStr =
      location !== undefined &&
      location !== null &&
      location !== false &&
      Object.values(location);
    if (coordinatesStr === false) {
      coordinatesStr = [0, 0];
    }

    const cleanCoordinate = coordinatesStr
      .filter((c) => c)
      .map((coordinate) => Number(coordinate));

    return {
      idVenue,
      nameVenue,
      cleanCoordinate,
      event,
    };
  });

  const filteredCoordinates = infoEvent.filter((event) => {
    return event.cleanCoordinate.length > 0;
  });
  const idsVenues = filteredCoordinates.map((event) => event.idVenue);

  const eventGroupped = {};

  idsVenues.forEach((id) => {
    return (eventGroupped[id] = filteredCoordinates.filter((event) => {
      return event.idVenue === id;
    }));
  });

  return eventGroupped;
}

export function createSectionsCoordinate(dataset) {
  const ids = Object.keys(dataset);
  const container = {};

  ids.forEach((id, i) => {
    const name = dataset[ids[i]][0].nameVenue;

    return (container[id] = {
      center: dataset[id][0].cleanCoordinate,
      bearing: 27,
      zoom: 17,
      speed: 1,
      curve: 0.7,
      pitch: 45,
      name,
    });
  });

  return container;
}

export function addMarkerVenue(coordinates, map) {
  const ids = Object.keys(coordinates);
  map.addControl(new mapboxgl.FullscreenControl());

  ids.forEach((id) => {
    var el = document.createElement("div");
    el.className = "marker";
    new mapboxgl.Marker(el).setLngLat(coordinates[id].center).addTo(map);
  });
}
