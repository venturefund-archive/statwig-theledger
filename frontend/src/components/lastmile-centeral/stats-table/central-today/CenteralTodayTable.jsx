import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import EmptyIcon from "../../../../assets/files/designs/empty-table.jpg";
import CenteralTodayRow from "./CenteralTodayRow";
import Pagination from "@mui/material/Pagination";

export default function CenteralTodayTable({ vaccinationList, t }) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      <TableContainer className="vl-mui-custom-tablecontainer">
        <div className="Beneficiary--header">
          <h1 className="vl-subtitle f-700 vl-black">{t("today_vaccine")}</h1>
          <h1 className="vl-body f-500 vl-grey-sm">
            {new Date().toLocaleDateString()}
          </h1>
        </div>
        {vaccinationList && vaccinationList?.length ? (
          <>
            <Table sx={{ minWidth: 650 }} className="vl-mui-custom-table">
              <TableHead className="vl-mui-custom-tablehead">
                <TableRow className="vl-mui-custom-tr">
                  <TableCell align="center">
                    <div className="vl-table-column">
                      <p className="vl-body f-500 vl-blue">{t("batch_no")}</p>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="vl-table-column">
                      <p className="vl-body f-500 vl-blue">
                        {t("manufacturer_name")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="vl-table-column">
                      <p className="vl-body f-500 vl-blue">{t("age")}</p>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="vl-table-column">
                      <p className="vl-body f-500 vl-blue">{t("gender")}</p>
                    </div>
                  </TableCell>

                  <TableCell align="center">
                    <div className="vl-table-column">
                      <p className="vl-body f-500 vl-blue">{t("state")}</p>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="vl-table-column">
                      <p className="vl-body f-500 vl-blue">{t("city")}</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="vl-mui-custom-tablebody">
                {vaccinationList &&
                  vaccinationList.map((row) => <CenteralTodayRow data={row} />)}
              </TableBody>
            </Table>
            <div className="mi_custom_pagination_wrapper">
              <Pagination count={10} page={page} onChange={handleChange} />
            </div>
          </>
        ) : (
          <div className="Table--Empty-container-alt">
            <div className="Table--empty-illustartion">
              <img src={EmptyIcon} alt="EmptyIcon" />
              <h1 className="vl-subheading f-500 vl-black">{t("no_rec")}</h1>
            </div>
          </div>
        )}
        <div className="padding-space"></div>
      </TableContainer>
    </>
  );
}
