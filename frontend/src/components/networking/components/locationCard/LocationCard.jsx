import React from "react";
import "./locationCard.scss";

const LocationCard = () => {
  return (
    <div className="location-cards-container mi-flex-sb">
      <div className="location-card-container loc-card">
        <div className="location-card-section1">
          <div className="loction-small-box">
            <i className="fa-solid fa-location-crosshairs location-icon"></i>
          </div>
          <p className="">My Location</p>
        </div>
        <div className="location-card-section2">
          <p className="">100</p>
          <p className="">ABC Manufacturer</p>
        </div>
      </div>

      <div className="partner-card-container loc-card">
        <div className="location-card-section1">
          <div className="location-icon">
            <i className="fa-solid fa-location-crosshairs"></i>
          </div>
          <p className="">My Location</p>
        </div>
        <div className="location-card-section2">
          <p className="">100</p>
          <p className="">ABC Manufacturer</p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
