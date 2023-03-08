import React from "react";
import TableCell from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";

export default function BestsellerRow() {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <div className="mi-table-data">
          <p className="mi-body-md black f-500 mi-reset">Vaccine</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        <div className="mi-table-data">
          <p className="mi-body-md black f-500 mi-reset">Covaxin</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        <div className="mi-table-data">
          <p className="mi-body-md black f-500 mi-reset">Bharath Biotech</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        <div className="mi-table-data">
          <p className="mi-body-md black f-500 mi-reset">450</p>
        </div>
      </TableCell>

      <TableCell component="th" scope="row">
        <div className="mi-table-data">
          <p className="mi-body-md black f-500 mi-reset">Abcdef</p>
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        <div className="mi-table-data">
          <p className="mi-body-md black f-500 mi-reset">Hyderabad</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
