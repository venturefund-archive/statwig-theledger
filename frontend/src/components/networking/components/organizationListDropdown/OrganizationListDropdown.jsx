import React, { useState } from "react";

const OrganizationListDropdown = () => {
  const [toggleButton, setToggleButton] = useState(false);
  return (
    <div className="mb-4">
      <div className="mi-flex-sa organization-list-dropdown">
        <div className="f-500">ABC Organization</div>
        <span className="list-options">(4 options)</span>
        {toggleButton ? (
          <i
            className="fa-solid fa-angle-up"
            onClick={() => setToggleButton(!toggleButton)}
          ></i>
        ) : (
          <i
            class="fa-solid fa-angle-down"
            onClick={() => setToggleButton(!toggleButton)}
          ></i>
        )}
      </div>
      {toggleButton && (
        <ul className="unordered-organization-list">
          <li className="mi-flex organization-list-item">
            <span>
              <i className="fa-solid fa-location-dot mr-2"></i>
            </span>
            <div>Location 1 - Hyderabad</div>
          </li>
          <li className="mi-flex organization-list-item">
            <span>
              <i className="fa-solid fa-location-dot mr-2"></i>
            </span>
            <div>Location 2 - Bhadradri Kothagudem</div>
          </li>
          <li className="mi-flex organization-list-item">
            <span>
              <i className="fa-solid fa-location-dot mr-2"></i>
            </span>
            <div>Location 3 - Adilabad</div>
          </li>
          <li className="mi-flex organization-list-item">
            <span>
              <i className="fa-solid fa-location-dot mr-2"></i>
            </span>
            <div>Location 4 - Mahabubabad</div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default OrganizationListDropdown;
