import React from "react";
import VisibilitySensor from "react-visibility-sensor";

export function SectionEventMobile({ events, id, isOnScreen }) {
  const onChange = (isVisible) => isVisible && isOnScreen(id);
  return (
    <section className={`event`}>
      <VisibilitySensor onChange={onChange}>
        {({ isVisible }) => {
          return <p className="name-location">{events[id][0].nameVenue}</p>;
        }}
      </VisibilitySensor>
      <div className="cards">
        {events[id].map((info) => {
          const nameEvent = info.event.name;
          const day = info.event.dates.start.localDate;
          const hour = info.event.dates.start.localTime;

          return (
            <div key={Math.random()} className="card">
              <p className="name-event">{nameEvent}</p>
              <p>{day}</p>
              <p>{hour}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
