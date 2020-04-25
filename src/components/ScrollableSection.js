import React, { useState, useEffect } from "react";
import { SectionEventMobile } from "./SectionEventMobile";
import SmoothScrolling from "./smoothScroll";
const initialCenter = [9.19, 45.4642];

const intial = {
  center: initialCenter,
  bearing: 27,
  zoom: 12,
  speed: 1,
  curve: 0.7,
  pitch: 45,
};

export function ScrollableSection({ infoVenues, map, events }) {
  const uids = Object.keys(infoVenues);

  const [currentId, setCurrentId] = useState("");

  const getId = (id) => setCurrentId(id);

  const scrollToNext = (id) => {
    const next = uids.indexOf(id) + 1;
    if (next < uids.length) {
      SmoothScrolling.scrollTo(uids[next]);
    }
  };

  useEffect(() => {
    map.flyTo(infoVenues[currentId] || intial);
  }, [currentId]);

  return (
    <>
      <button className="btn-next" onClick={() => scrollToNext(currentId)}>
        next venue
      </button>
      <section id="first" className="section-event">
        <h1>
          <span className="white">Events</span> in evidence in the next period
          in <span>Milan</span>.
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
    </>
  );
}
