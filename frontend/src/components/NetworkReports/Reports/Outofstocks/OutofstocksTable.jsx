import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OutofstocksRow from "./OutofstocksRow";
import {
	getmanufacturerOutStockReport,
	getOutStockFilterOptions,
} from "../../../../actions/networkActions";
import { useTranslation } from "react-i18next";

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
					<p className="mi-body-sm f-400 mi-reset grey-400">Organization Name</p>
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
					<p className="mi-body-sm f-400 mi-reset grey-400">No of Days</p>
					<i class="fa-solid fa-sort grey-400"></i>
				</div>
			</TableCell>
		</TableRow>
	);
}

export default function OutofstocksTable() {
	const [outStockFilters, setOutStockFilters] = useState();
	const [outStock, setOutStock] = useState([]);
	const [reportWarehouse, setReportWarehouse] = useState("");

  const { t } = useTranslation();

	const getOutstockFilters = async () => {
		const outStockFilters = await getOutStockFilterOptions(reportWarehouse, "");
		if (outStockFilters) setOutStockFilters(outStockFilters.filters);
	};

	const getOutStock = async () => {
		const outStock = await getmanufacturerOutStockReport(
			reportWarehouse,
			// startDate,
		);
		if (outStock) setOutStock(outStock.data.outOfStockReport);
		if (outStock) setReportWarehouse(outStock.data.warehouseId);
	};

	useEffect(() => {
		getOutStock();
		getOutstockFilters();
	}, []);

	return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableHeader />
				</TableHead>
				<TableBody>
					{outStock.map((product, index) => (
						<OutofstocksRow t={t} product={product} key={index} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
