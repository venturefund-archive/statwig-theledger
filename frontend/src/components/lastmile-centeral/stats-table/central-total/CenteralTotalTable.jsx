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
import CenteralTotalRow from "./CenteralTotalRow";

export default function CenteralTotalTable({ vaccinationList, t }) {
  return (
    <>
      <TableContainer className="vl-mui-custom-tablecontainer">
        <div className="Beneficiary--header">
          <h1 className="vl-subtitle f-700 vl-black">{t("total_vaccine")}</h1>
        </div>
        {vaccinationList && vaccinationList?.length ? (
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
                    <p className="vl-body f-500 vl-blue">{t("location")}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="vl-table-column">
                    <p className="vl-body f-500 vl-blue">{t("gender")}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="vl-table-column">
                    <p className="vl-body f-500 vl-blue">{t("age")}</p>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="vl-table-column">
                    <p className="vl-body f-500 vl-blue">{t("date")}</p>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="vl-mui-custom-tablebody">
              {vaccinationList &&
                vaccinationList.map((row) => <CenteralTotalRow data={row} />)}
            </TableBody>
          </Table>
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
