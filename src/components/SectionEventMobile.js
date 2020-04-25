import React from "react";
import VisibilitySensor from "react-visibility-sensor";

export function SectionEventMobile({ events, id, isOnScreen }) {
  const onChange = (isVisible) => isVisible && isOnScreen(id);
  return (
    <section>
      <VisibilitySensor onChange={onChange}>
        {({ isVisible }) => {
          return (
            <h1 className={` ${isVisible ? "blue" : "red"}`}>
              {events[id][0].nameVenue}
            </h1>
          );
        }}
      </VisibilitySensor>
      {events[id].map((info) => {
        return (
          <div key={Math.random()}>
            <p>{info.event.name}</p>
          </div>
        );
      })}
    </section>
  );
}
