import { TableCell, TableRow } from "@mui/material";
import React from "react";

export default function CenteralUnitsRow({ data }) {
  return (
    <TableRow className="vl-mui-custom-tr">
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">01</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">12345</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">Dose</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">Date</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
