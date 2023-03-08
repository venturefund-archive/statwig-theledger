import React, { useState } from "react";
import "./NetworkReports.css";
import ReportAnalytics from "./ReportAnalytics/ReportAnalytics";
import BestsellerTable from "./Reports/Bestseller/BestsellerTable";
import ExpiredTable from "./Reports/Expired/ExpiredTable";
import InstocksTable from "./Reports/Instocks/InstocksTable";
import NearexpireTable from "./Reports/Nearexpire/NearexpireTable";
import OutofstocksTable from "./Reports/Outofstocks/OutofstocksTable";
import ReportSearch from "./ReportSearch/ReportSearch";

function TabList({ Tab, setTab }) {
  return (
    <div className="Tablist_container">
      <div
        className={`Tab_Link ${Tab === "out_stock" && "active"}`}
        onClick={() => setTab("out_stock")}
      >
        <p className="vl-subheading">Out of stocks</p>
      </div>
      <div
        className={`Tab_Link ${Tab === "in_stock" && "active"}`}
        onClick={() => setTab("in_stock")}
      >
        <p className="vl-subheading">In-Stock</p>
      </div>
      <div
        className={`Tab_Link ${Tab === "near_expire" && "active"}`}
        onClick={() => setTab("near_expire")}
      >
        <p className="vl-subheading">Near Expiration</p>
      </div>
      <div
        className={`Tab_Link ${Tab === "expired" && "active"}`}
        onClick={() => setTab("expired")}
      >
        <p className="vl-subheading">Expired</p>
      </div>
      <div
        className={`Tab_Link ${Tab === "best_seller" && "active"}`}
        onClick={() => setTab("best_seller")}
      >
        <p className="vl-subheading">Best Seller</p>
      </div>
    </div>
  );
}

export default function NetworkReports() {
  const [Result, setResult] = useState(true);
  const [Tab, setTab] = useState("out_stock");

  return (
    <section className="NetworkReports_container">
      <div className="NetworkReports_Search_Header">
        <ReportSearch setResult={setResult} />
      </div>
      <main className={`Result_space ${Result && "show"}`}>
        <div className="NetworkReports_Breadcrumps_links">
          <p className="vl-subheading f-500">India</p>
          <i class="fa-solid fa-chevron-right"></i>
          <p className="vl-subheading f-500">Telangana</p>
          <i class="fa-solid fa-chevron-right"></i>
          <p className="vl-subheading f-500">Hyderabad</p>
        </div>
        <div className="NetworkReports_Analytics_container">
          <ReportAnalytics variant={1} title="Out of Stocks" value="1345" />
          <ReportAnalytics variant={2} title="In stock" value="1745" />
          <ReportAnalytics variant={3} title="Best sellers" value="545" />
        </div>
        <div className="NetworkReports_Table_Wrapper">
          <TabList Tab={Tab} setTab={setTab} />
          {Tab === "out_stock" && <OutofstocksTable />}
          {Tab === "in_stock" && <InstocksTable />}
          {Tab === "near_expire" && <NearexpireTable />}
          {Tab === "expired" && <ExpiredTable />}
          {Tab === "best_seller" && <BestsellerTable />}
        </div>
      </main>
    </section>
  );
}
