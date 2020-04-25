import React, { useState, useEffect } from "react";
import { SectionEvent } from "./SectionEvent";
import { SectionEventMobile } from "./SectionEventMobile";
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

  useEffect(() => {
    map.flyTo(infoVenues[currentId] || intial);
  }, [currentId]);

  return (
    <div>
      <section className="section-event"></section>
      {uids.map((id) => {
        return (
          <section key={Math.random()} className="section-event">
            {window.innerWidth > 600 ? (
              <SectionEvent id={id} events={events} isOnScreen={getId} />
            ) : (
              <SectionEventMobile id={id} events={events} isOnScreen={getId} />
            )}
          </section>
        );
      })}
    </div>
  );
}
