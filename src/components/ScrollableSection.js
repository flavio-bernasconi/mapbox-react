import React, { useState, useEffect } from "react";
import { SectionEventMobile } from "./SectionEventMobile";
import SmoothScrolling from "./smoothScroll";
import { Venues } from "./Venues";

const initialCenter = [-90.19, 40.4642];

const intial = {
  center: initialCenter,
  bearing: 27,
  zoom: 3,
  speed: 1,
  curve: 0.7,
  pitch: 45,
};

export function ScrollableSection({ infoVenues, map, events }) {
  const uids = Object.keys(infoVenues);

  const [currentId, setCurrentId] = useState("");

  const getId = (id) => {
    console.log(id);
    setCurrentId(id);
  };

  const scrollToVenue = (id) => {
    setCurrentId(id);
    SmoothScrolling.scrollTo(id);
  };

  const scrollToNext = (id) => {
    const next = uids.indexOf(id) + 1;
    if (next < uids.length) {
      SmoothScrolling.scrollTo(uids[next]);
    }
  };

  // setTimeout(() => {
  //   scrollToNext("Zb98xZKrZevvvedZ5rrj5urKO2");
  // }, 3000);

  useEffect(() => {
    map.flyTo(infoVenues[currentId] || intial);
  }, [currentId]);

  return (
    <div className="bk">
      <button className="btn-next" onClick={() => scrollToNext(currentId)}>
        next venue
      </button>
      <Venues venues={infoVenues} passId={scrollToVenue} />

      <section id="first" className="section-event">
        <h1>
          <span className="white">Upcoming</span> events in the
          <span> US</span>.
        </h1>
        <p>Scroll down</p>
      </section>
      {uids.map((id) => {
        return (
          <section key={Math.random()} className="section-event" id={id}>
            <SectionEventMobile id={id} events={events} isOnScreen={getId} />
          </section>
        );
      })}
    </div>
  );
}
