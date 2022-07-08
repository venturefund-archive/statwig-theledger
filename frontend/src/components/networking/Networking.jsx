import React from "react";
import "./Networking.scss";
import NetworkSidebar from "./components/networkSidebar/NetworkSidebar";

export default function Networking() {
  return (
    <div className="network-main-layout">
      <div className="network-grid-container">
        <div className="network-left">
          <div className="network-left-content-space">
            <div className="my-content">
              <NetworkSidebar/>
            </div>
          </div>
        </div>
        <div className="network-right">
          <div className="network-right-content-space">Network Right Area</div>
        </div>
      </div>
    </div>
  );
}
