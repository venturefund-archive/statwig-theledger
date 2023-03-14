import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NearexpireRow from "./NearexpireRow";
import { useTranslation } from "react-i18next";
import { getManufacturerNearExpiryStockReport } from "../../../../actions/networkActions";

function TableHeader() {
  return (
    <TableRow>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Product category</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Product Name</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Manufacturer</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Batch Number</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Expiry Date</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">
            Organization Name
          </p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Location Details</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function NearexpireTable() {
  const [nearExpiryStock, setNearExpiryStock] = useState([]);
  const [nearExpiryStockFilters, setNearExpiryStockFilters] = useState();
	const [reportWarehouse, setReportWarehouse] = useState("");

  const { t } = useTranslation();

  const getNearExpiryStock = async (startDate) => {
    const nearExpiryStock = await getManufacturerNearExpiryStockReport(
      reportWarehouse,
      // startDate,
    );
    if (nearExpiryStock) setNearExpiryStock(nearExpiryStock.data.nearExpiryProducts);
    if (nearExpiryStock) setReportWarehouse(nearExpiryStock.data.warehouseId);
  };

  // const getNearExpiryStockFilters = async () => {
  //   const nearExpiryStockFilters = await getInStockFilterOptions(reportWarehouse, "");
  //   if (nearExpiryStockFilters) setNearExpiryStockFilters(nearExpiryStockFilters.filters);
  // };

  useEffect(() => {
		getNearExpiryStock();
		// getNearExpiryStockFilters();
	}, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableHeader />
        </TableHead>
        <TableBody>
          {nearExpiryStock.map((product, index) => (
            <NearexpireRow t={t} product={product} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
