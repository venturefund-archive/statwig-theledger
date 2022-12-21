import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  exportVaccinationList,
  getAllVaccinationDetails,
  getAnalyticsWithFilters,
  getVialsUtilised,
} from "../../actions/lastMileActions";
import AnalyticTiles from "../../shared/stats-tile/AnalyticTiles";
import Filterbar from "./filterbar/Filterbar";
import "./LastmileCenteral.css";
import CenteralTodayTable from "./stats-table/central-today/CenteralTodayTable";
import CenteralTotalTable from "./stats-table/central-total/CenteralTotalTable";
import CenteralUnitsTable from "./stats-table/central-units/CenteralUnitsTable";
import { turnOn, turnOff } from "../../actions/spinnerActions";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

export default function LastmileCenteral(props) {
  const dispatch = useDispatch();

  const [analytics, setAnalytics] = useState();
  const [TableSwitch, setTableSwitch] = useState("today");
  const [filters, setFilters] = useState({});
  const { t } = useTranslation();

  const [vaccinationList, setVaccinationList] = useState([]);
  const [todaysVaccinationList, setTodaysVaccinationList] = useState([]);
  const [unitsUtilized, setUnitsUtilized] = useState([]);
  const [ButtonOpen, setButtonOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setButtonOpen(false);
  });

  useEffect(async () => {
    dispatch(turnOn());
    // Fetch analytics
    const analyticsResponse = await getAnalyticsWithFilters(filters);
    setAnalytics(analyticsResponse.data.data);

    if (TableSwitch === "today") {
			let payload = filters;
			payload.today = true;
			const result = await getAllVaccinationDetails(payload);
			if (result?.data?.success) {
				setTodaysVaccinationList(result.data.data);
			}
		} else if (TableSwitch === "total") {
			const result = await getAllVaccinationDetails(filters);
			if (result?.data?.success) {
				setVaccinationList(result.data.data);
			}
		} else if (TableSwitch === "units") {
			const result = await getVialsUtilised(filters);
			if (result?.data?.success) {
				setUnitsUtilized(result.data.data);
			}
		}

    dispatch(turnOff());
  }, [filters, TableSwitch]);

  // useEffect(() => {
  //   (async () => {
	// 		dispatch(turnOn());
	// 		const unitsUtilized = await getVialsUtilised(filters);
	// 		if (unitsUtilized?.data?.success) {
	// 			setUnitsUtilized(unitsUtilized.data.data);
	// 		}

	// 		const result = await getAllVaccinationDetails(filters);
	// 		if (result?.data?.success) {
	// 			setVaccinationList(result.data.data.vaccinationDetails);
	// 			setTodaysVaccinationList(result.data.data.todaysVaccinationDetails);
	// 			setAnalytics(result.data.data.analytics);
	// 		}
	// 		dispatch(turnOff());
	// 	})();
  // }, [filters, TableSwitch]);

  const exportVaccinationReport = async (type) => {
    let data = filters;
    data.reportType = type ? type : "excel";

    const result = await exportVaccinationList(data);
    if (result?.data && result?.status === 200) {
      const downloadUrl = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `VaccinationReport.${type === "excel" ? "xlsx" : "pdf"}`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div className='LastmileCenteral--Grid-layout'>
      <div className='LastmileCenteral--table-wrapper'>
        <div className='Lastmile--pageHeader'>
          <h1
            style={{ paddingBottom: "10px" }}
            className='vl-heading-bdr black f-700 mi-reset'
          >
            {t("lastmile")}
          </h1>
          <div className='export-collapse-btn' ref={domNode}>
            <button
              onClick={() => setButtonOpen(!ButtonOpen)}
              className='vl-btn vl-btn-sm vl-btn-primary'
            >
              <span>
                <i className='fa-solid fa-file-export'></i>
              </span>
              {t("export")}
            </button>
            <div className={`export-button-dropdown ${ButtonOpen && "active"}`}>
              <div
                className='export-btn-dropdown-card'
                onClick={() => exportVaccinationReport("excel")}
              >
                <i className='fa-solid fa-file-csv vl-excel'></i>
                <p className='vl-note f-500'>
                  {t("export")} {t("as")} Excel
                </p>
              </div>
              <div
                className='export-btn-dropdown-card'
                onClick={() => exportVaccinationReport("pdf")}
              >
                <i className='fa-solid fa-file-pdf vl-pdf'></i>
                <p className='vl-note f-500'>
                  {t("export")} {t("as")} PDF
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='LastmileCenteral--Stats-filters'>
          <AnalyticTiles
            layout='2'
            variant='3'
            title={t("no_beneficiaries_vaccinated_today")}
            stat={
              analytics?.todaysVaccinations ? analytics.todaysVaccinations : 0
            }
            link='today'
            setTableSwitch={setTableSwitch}
          />
          <AnalyticTiles
            layout='2'
            variant='2'
            title={t("no_beneficiaries_vaccinated_so_far")}
            stat={
              analytics?.totalVaccinations ? analytics.totalVaccinations : 0
            }
            link='total'
            setTableSwitch={setTableSwitch}
          />
          <AnalyticTiles
            layout='2'
            variant='1'
            title={t("total_units_utilized")}
            stat={analytics?.unitsUtilized ? analytics.unitsUtilized : 0}
            link='units'
            setTableSwitch={setTableSwitch}
          />
        </div>
        {TableSwitch === "today" && (
          <CenteralTodayTable t={t} vaccinationList={todaysVaccinationList} />
        )}
        {TableSwitch === "total" && (
          <CenteralTotalTable t={t} vaccinationList={vaccinationList} />
        )}
        {TableSwitch === "units" && (
          <CenteralUnitsTable t={t} unitsUtilized={unitsUtilized} />
        )}
      </div>
      <div className='LastmileCenteral--filter-wrapper'>
        <Filterbar
          t={t}
          tableType={TableSwitch}
          filters={filters}
          setFilters={setFilters}
          {...props}
        />
      </div>
    </div>
  );
}
