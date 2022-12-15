import { TableCell, TableRow } from "@mui/material";
import { format } from "date-fns";
import React from "react";

export default function UnitUsedRow({
  vial,
  index,
  setSteps,
  setTableView,
  setBatchDetails,
}) {
  console.log(vial);
  return (
    <TableRow className="vl-mui-custom-tr">
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">{index + 1}</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">{vial.batchNumber}</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">{vial.numberOfDoses}</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <p className="vl-body f-500 ">
            {format(new Date(vial.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row" align="center">
        <div className="vl-table-body-column">
          <div
            className="mi_status_label status_bg_add"
            onClick={() => {
              setTableView(false);
              setBatchDetails(vial);
              setSteps(2);
            }}
          >
            <i class="fa-solid fa-plus"></i>
            <p className="vl-body f-500">Add</p>
          </div>
          {/* <div className="mi_status_label status_bg_completed">
            <i class="fa-solid fa-circle-check"></i>
            <p className="vl-body f-500">Completed</p>
          </div> */}
        </div>
      </TableCell>
    </TableRow>
  );
}
