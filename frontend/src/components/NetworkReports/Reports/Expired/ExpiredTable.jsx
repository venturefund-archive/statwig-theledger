import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ExpiredRow from "./ExpiredRow";
import ProductList from "../../../productList";
import { useTranslation } from "react-i18next";
import { getManufacturerExpiredStockReport } from "../../../../actions/networkActions";

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

export default function ExpiredTable() {
  const [expiredStock, setExpiredStock] = useState([]);
  const [expiredStockFilters, setExpiredStockFilters] = useState();
	const [reportWarehouse, setReportWarehouse] = useState("");

  const { t } = useTranslation();

  const getExpiredStock = async (startDate) => {
    const expiredStock = await getManufacturerExpiredStockReport(
      reportWarehouse,
      // startDate,
    );
    if (expiredStock) setExpiredStock(expiredStock.data.expiredProducts);
    if (expiredStock) setReportWarehouse(expiredStock.data.warehouseId);
  };

  // const getExpiredStockFilters = async () => {
  //   const expiredStockFilters = await getInStockFilterOptions(reportWarehouse, "");
  //   if (expiredStockFilters) setExpiredStockFilters(expiredStockFilters.filters);
  // };

  useEffect(() => {
		getExpiredStock();
		// getexpiredStockFilters();
	}, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableHeader />
        </TableHead>
        <TableBody>
          {expiredStock.map((product, index) => (
            <ExpiredRow t={t} product={product} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
