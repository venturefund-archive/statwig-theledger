import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InstocksRow from "./InstocksRow";
import { useTranslation } from "react-i18next";
import { getInStockFilterOptions, getmanufacturerInStockReport } from "../../../../actions/networkActions";

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
      <TableCell>
        <div className="mi_report_table_head">
          <p className="mi-body-sm f-400 mi-reset grey-400">Quantity (UOM)</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function InstocksTable() {
  const [inStock, setInStock] = useState([]);
  const [inStockFilters, setInStockFilters] = useState();
	const [reportWarehouse, setReportWarehouse] = useState("");

  const { t } = useTranslation();

  const getInstock = async (startDate) => {
    const inStock = await getmanufacturerInStockReport(
      reportWarehouse,
      // startDate,
    );
    if (inStock) setInStock(inStock.data.inStockReport);
    if (inStock) setReportWarehouse(inStock.data.warehouseId);
  };

  const getInstockFilters = async () => {
    const inStockFilters = await getInStockFilterOptions(reportWarehouse, "");
    if (inStockFilters) setInStockFilters(inStockFilters.filters);
  };

  useEffect(() => {
		getInstock();
		getInstockFilters();
	}, []);

  return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableHeader />
				</TableHead>
				<TableBody>
					{inStock.map((product, index) => (
						<InstocksRow t={t} product={product} reportWarehouse={reportWarehouse} key={index} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
