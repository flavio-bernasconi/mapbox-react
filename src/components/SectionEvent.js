import React from "react";
import VisibilitySensor from "react-visibility-sensor";

export function SectionEvent({ events, id, isOnScreen }) {
  const onChange = (isVisible) => isVisible && isOnScreen(id);
  return (
    <VisibilitySensor onChange={onChange}>
      {({ isVisible }) => {
        return (
          <section className={` card ${isVisible ? "blue" : "red"}`}>
            <h1>{events[id][0].nameVenue}</h1>
            {events[id].map((info) => {
              return (
                <div key={Math.random()}>
                  <p>{info.event.name}</p>
                </div>
              );
            })}
          </section>
        );
      }}
    </VisibilitySensor>
  );
}
