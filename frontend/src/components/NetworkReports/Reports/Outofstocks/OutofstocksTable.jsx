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
import ReportFilter from "../../Filter/ReportFilter";
import { useTheme, styled } from "@mui/material/styles";

function TableHeader({
	anchorEl,
	value,
	pendingValue,
	setAnchorEl,
	setValue,
	setPendingValue,
	handleClick,
	handleClose,
	theme,
  outStockFilters,
  selectedFilters,
  handleFilterUpdate,
	t,
}) {
  const [productCategories, setProductCategories] = useState([]);
  const [productNames, setProductNames] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
		if (outStockFilters?.length) {
      let categoriesSet = new Set();
      let productNamesSet = new Set();
      let manufacturersSet = new Set();
			outStockFilters.map((elem) => {
				categoriesSet.add({ name: elem.productCategory });
				productNamesSet.add({ name: elem.productName });
				manufacturersSet.add({ name: elem.manufacturer });
			});
			setProductCategories([...categoriesSet]);
			setProductNames([...productNamesSet]);
			setManufacturers([...manufacturersSet]);
		}
	}, [outStockFilters]);

	return (
		<TableRow>
			<TableCell>
				<div className="mi_report_table_head" onClick={handleClick}>
					<p className="mi-body-sm f-400 mi-reset grey-400">Product category</p>
					<i class="fa-solid fa-sort grey-400"></i>
				</div>
				<ReportFilter
          title={t("product_category")}
          fieldName="productCategory"
					anchorEl={anchorEl}
					value={value}
					pendingValue={pendingValue}
					setAnchorEl={setAnchorEl}
					setValue={setValue}
					setPendingValue={setPendingValue}
					handleClick={handleClick}
					handleClose={handleClose}
					theme={theme}
          labels={productCategories}
          selectedFilters={selectedFilters}
          handleFilterUpdate={handleFilterUpdate}
				/>
			</TableCell>
			<TableCell>
				<div className="mi_report_table_head" onClick={handleClick}>
					<p className="mi-body-sm f-400 mi-reset grey-400">Product Name</p>
					<i class="fa-solid fa-sort grey-400"></i>
				</div>
				<ReportFilter
					title={t("product_name")}
          fieldName="productName"
					anchorEl={anchorEl}
					value={value}
					pendingValue={pendingValue}
					setAnchorEl={setAnchorEl}
					setValue={setValue}
					setPendingValue={setPendingValue}
					handleClick={handleClick}
					handleClose={handleClose}
					theme={theme}
					labels={productNames}
          selectedFilters={selectedFilters}
          handleFilterUpdate={handleFilterUpdate}
				/>
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState([labels[1], labels[11]]);
  const [pendingValue, setPendingValue] = React.useState([]);
  const [outStockFilters, setOutStockFilters] = useState();
	const [outStock, setOutStock] = useState([]);
	const [reportWarehouse, setReportWarehouse] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    productCategory: "",
    productName: "",
    manufacturer: "",
    organisationName: "",
    numberOfDays: ""
  });

  const theme = useTheme();
  const { t } = useTranslation();

  const handleFilterUpdate = (fieldName, newValue) => {
		if (!fieldName) return;
		let oldFilters = selectedFilters;
    oldFilters[fieldName] = newValue;
    setSelectedFilters(oldFilters);
  };
  
  console.log(value, pendingValue)

  const handleClick = (event) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

	const getOutstockFilters = async () => {
		const outStockFilters = await getOutStockFilterOptions(reportWarehouse, "");
    if (outStockFilters) setOutStockFilters(outStockFilters.filters);
    console.log(outStockFilters)
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
          <TableHeader
            anchorEl={anchorEl}
            value={value}
            pendingValue={pendingValue}
            setAnchorEl={setAnchorEl}
            setValue={setValue}
            setPendingValue={setPendingValue}
            handleClick={handleClick}
            handleClose={handleClose}
            theme={theme}
            outStockFilters={outStockFilters}
            selectedFilters={selectedFilters}
            handleFilterUpdate={handleFilterUpdate}
            t={t}
          />
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

const labels = [
  {
    name: "1 Filter Option",
  },
  {
    name: "2 Filter Option",
  },
  {
    name: "3 Filter Option",
  },
  {
    name: "4 Filter Option",
  },
  {
    name: "5 Filter Option",
  },
  {
    name: "6 Filter Option",
  },
  {
    name: "7 Filter Option",
  },
  {
    name: "8 Filter Option",
  },
  {
    name: "9 Filter Option",
  },
  {
    name: "10 Filter Option",
  },
  {
    name: "11 Filter Option",
  },
  {
    name: "12 Filter Option",
  },
  {
    name: "13 Filter Option",
  },
  {
    name: "14 Filter Option",
  },
  {
    name: "15 Filter Option",
  },
  {
    name: "16 Filter Option",
  },
  {
    name: "17 Filter Option",
  },
  {
    name: "18 Filter Option",
  },
  {
    name: "19 Filter Option",
  },
  {
    name: "10 Filter Option",
  },
];
