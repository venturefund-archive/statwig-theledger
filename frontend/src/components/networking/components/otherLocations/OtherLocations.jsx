import React, { useState } from "react";
import SearchCountry from "../searchCountry/SearchCountry";
import SearchOrganization from "../searchOrganization/SearchOrganization";
import "./otherLocations.scss";
const OtherLocations = () => {
  const [isCountryTab, setIsCountryTab] = useState(false);
  return (
    <div className="other-locations-container mt-4">
      <p className="other-locations-heading f-500">Other Locations</p>
      <p className="other-locations-text">
        Search by Organizations or Countries
      </p>
      <div className="other-locations-buttons-container ">
        <button
          className={`other-loc-btn other-loc-org-btn ${
            isCountryTab ? "inactive" : "active"
          }`}
          onClick={() => setIsCountryTab(false)}
        >
          <span>
            <i className="fa-solid fa-building mr-2"></i>
          </span>
          Organisation
        </button>
        <button
          className={`other-loc-btn ${isCountryTab ? "active" : "inactive"}`}
          onClick={() => setIsCountryTab(true)}
        >
          <span>
            <i className="fa-solid fa-earth-africa mr-2"></i>
          </span>
          Countries
        </button>
      </div>
      {isCountryTab ? <SearchCountry /> : <SearchOrganization />}
    </div>
  );
};

export default OtherLocations;
