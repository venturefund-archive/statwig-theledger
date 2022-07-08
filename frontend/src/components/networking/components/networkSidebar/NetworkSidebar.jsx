import React from "react";
import BestSeller from "../bestSeller/BestSeller";
import LocationCard from "../locationCard/LocationCard";
import OtherLocations from "../otherLocations/OtherLocations";
import  "./networkSidebar.scss"

const NetworkSidebar = () => {
  
  return <div className="network-sidebar-container p-4">
    <p className="f-700 network-sidebar-heading">ABC Manufacturer</p>
    <p className="network-sidebar-address">Location address</p>
    <LocationCard/>
    <BestSeller/>
    <OtherLocations/>

  </div>;
};

export default NetworkSidebar;
