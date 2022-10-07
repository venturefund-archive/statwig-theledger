import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LocationRow({ product }) {
  const navigate = useNavigate();
  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset !important" } }}
        className="vl-custom-tableRow"
        onClick={() => navigate("/statwig/view-users")}
      >
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">MAX01</p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">Hyderabad</p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">
            IT Hub, VP road Pune Maharashtra 400096 India
          </p>
        </TableCell>
        <TableCell align="center">
          <p className="vl-body f-400 vl-grey-md">24</p>
        </TableCell>
        <TableCell align="center">
          {product.status ? (
            <div className="label-status-btn status-accept-bg">
              <div className="status-dot status-accept-dot"></div>
              <p className="vl-small f-500 vl-black">Active</p>
            </div>
          ) : (
            <div className="label-status-btn status-reject-bg">
              <div className="status-dot status-reject-dot"></div>
              <p className="vl-small f-500 vl-black">InActive</p>
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
