import React from "react";
import "./ReportAnalytics.css";

export default function ReportAnalytics({ variant, title, value }) {
  return (
    <div className={`ReportAnalytics_card variant_${variant}`}>
      <div className="ReportAnalytics_card_content">
        <p className="vl-heading f-400">{title}</p>
        <h1 className="vl-title f-700">{value || "0"}</h1>
      </div>
    </div>
  );
}
