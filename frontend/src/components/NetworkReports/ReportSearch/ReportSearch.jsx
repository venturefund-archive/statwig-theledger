import React from "react";
import "./ReportSearch.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ReportSearch({ setResult }) {
  const top100Films = [
    { label: "India" },
    { label: "Costa Rica" },
    { label: "India" },
    { label: "Costa Rica" },
    { label: "India" },
    { label: "Costa Rica" },
    { label: "India" },
    { label: "Costa Rica" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setResult(true);
  };
  return (
    <section className="ReportSearch_container">
      <h1 className="Report_page_title_ts">Search here for units</h1>
      <div className="main_searchbar_wrapper">
        <div className="search_icon_wrap">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="input_hold bdr">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="mi_report_autocomplete"
            options={top100Films}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Country"
                className="mi_report_textfield"
              />
            )}
          />
        </div>
        <div className="input_hold bdr">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="mi_report_autocomplete"
            options={top100Films}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="State"
                className="mi_report_textfield"
              />
            )}
          />
        </div>
        <div className="input_hold">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="mi_report_autocomplete"
            options={top100Films}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="District"
                className="mi_report_textfield"
              />
            )}
          />
        </div>
        <div className="null_space"></div>
        <button className="result_search_button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </section>
  );
}
