import React from "react";
import Analytics from "./Analytics/Analytics";
import "./Dashboard.css";
import Pendings from "./Pendings/Pendings";

export default function Dashboard() {
  return (
    <section className="admin-page-layout">
      <div className="admin-container">
        <div className="admin-dashboard-container section-space">
          <div className="dashboard-left-space">
            <Analytics />
          </div>
          <div className="dashboard-right-space">
            <Pendings />
          </div>
        </div>
      </div>
    </section>
  );
}
