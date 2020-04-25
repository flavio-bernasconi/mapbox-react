import React, { useState } from "react";

export function Venues({ venues, passId }) {
  const uids = Object.keys(venues);
  const [isOpen, setIsOpen] = useState(false);

  const closeIt = () => setIsOpen(false);
  const openIt = () => setIsOpen(true);
  const clickVenue = (id) => {
    closeIt();
    passId(id);
  };

  return (
    <>
      <button className="btn-open" onClick={openIt}>
        All venues
      </button>
      <div className={`container-venues ${isOpen ? "open" : "close"}`}>
        <div className={`venue-page `}>
          <button className="btn-close" onClick={closeIt}>
            close
          </button>
          {uids.map((id) => {
            return (
              <div className={`${id} venue`} onClick={() => clickVenue(id)}>
                <h1> {venues[id].name}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
