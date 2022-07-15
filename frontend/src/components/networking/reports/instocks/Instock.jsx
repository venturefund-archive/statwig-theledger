import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import InstockRow from "./InstockRow";

export default function Instock({ Distributor }) {
  const Data = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
    {
      id: "8",
    },
  ];
  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 665 }}
          className="mi-custom-table"
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow>
              <TableCell className="mi-custom-tableHead ">
                <p className="mi-body-sm mi-reset grey-400">Product Category</p>
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">Product Name</p>
              </TableCell>
              {Distributor && (
                <TableCell className="mi-custom-tableHead">
                  <p className="mi-body-sm mi-reset grey-400">
                    Manufacturer Name
                  </p>
                </TableCell>
              )}
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">Closing balance</p>
              </TableCell>
              <TableCell className="mi-custom-tableHead">
                <p className="mi-body-sm mi-reset grey-400">
                  Current In stock (Qty)
                </p>
              </TableCell>
              <TableCell className="mi-custom-tableHead"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((rows) => (
              <InstockRow key={rows.id} Distributor={Distributor} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
