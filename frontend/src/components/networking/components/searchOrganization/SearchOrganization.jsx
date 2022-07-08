import React from "react";
import OrganizationListDropdown from "../organizationListDropdown/OrganizationListDropdown";
import "./searchOrganization.scss";

const SearchOrganization = () => {
  return (
    <div>
      <div className="mi-flex-ac mt-4">
        <input
          type="search"
          placeholder="Search by Organization"
          className="searchOrganization"
        />
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
      </div>
      <p className="organization-list-heading">Organization List</p>
         <OrganizationListDropdown />
         <OrganizationListDropdown />
         <OrganizationListDropdown /> 
     
    </div>
  );
};

export default SearchOrganization;
