import React from "react";
import "./locationCard.scss";

const LocationCard = () => {
  return (
    <div className="location-cards-container">
      <div className="location-card-container loc-card">
        <div className="location-card-section1">
          <div className="location-small-box mb-1">
            <i className="fa-solid fa-location-crosshairs location-icon"></i>
          </div>
          <p className="color-white location-card-heading">My Location</p>
        </div>
        <div className="location-card-section2">
          <p className="color-white location-card-section2-heading">100</p>
          <p className="color-white location-card-section2-subtext">
            ABC Manufacturer
          </p>
        </div>
      </div>

      <div className="partner-card-container loc-card">
        <div className="location-card-section1">
          <div className="location-small-box mb-1">
          <i className="fa-solid fa-map-location location-icon"></i>
          </div>
          <p className="color-white partner-card-heading">Partner Location</p>
        </div>
        <div className="location-card-section2">
          <p className="color-white location-card-section2-heading">2100</p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
