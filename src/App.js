import React, { useEffect, useState } from "react";
import { addBuilding3D } from "./uitils/building3d";
import {
  getInfoVenues,
  createSectionsCoordinate,
  getEventsInfo,
  addMarkerVenue,
} from "./uitils/apiCall";
import { ScrollableSection } from "./components/ScrollableSection";
import { createMap } from "./uitils/createMap";

const _ = require("lodash");

const map = createMap();

export function App() {
  const [eventsGroupedPerVenue, setEventsGroupedPerVenue] = useState({});
  const [venuesCoordinates, setVenueCoordinates] = useState({});

  useEffect(() => {
    addBuilding3D(map);
    getEventsInfo()
      .then((infos) => {
        const venueGroups = getInfoVenues(infos);
        const venuesCoordinatesGroup = createSectionsCoordinate(
          getInfoVenues(infos)
        );
        setEventsGroupedPerVenue(venueGroups);
        setVenueCoordinates(venuesCoordinatesGroup);
        addMarkerVenue(createSectionsCoordinate(getInfoVenues(infos)), map);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!_.isEmpty(venuesCoordinates)) {
    return (
      <ScrollableSection
        events={eventsGroupedPerVenue}
        infoVenues={venuesCoordinates}
        map={map}
      />
    );
  } else {
    return <></>;
  }
}
