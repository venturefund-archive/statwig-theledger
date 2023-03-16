import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import BestsellerRow from "./BestsellerRow";
import { useTranslation } from "react-i18next";
import { getBestSellers } from "../../../../actions/networkActions";
import { useTheme, styled } from "@mui/material/styles";
import Filterbar from "../../Filter/Filterbar";

const options = [
  "All",
  "Product 1",
  "Product 2",
  "Product 3",
  "Product 4",
  "Product 5",
];

function TableHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [DefaultValue, setDefaultValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  console.log(DefaultValue);

  console.log(inputValue);

  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="mi_report_table_head" onClick={handleClick}>
          <p className="mi-body-sm f-400 mi-reset grey-400">Product category</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
        <Filterbar
          anchorEl={anchorEl}
          DefaultValue={DefaultValue}
          inputValue={inputValue}
          setAnchorEl={setAnchorEl}
          setDefaultValue={setDefaultValue}
          setInputValue={setInputValue}
          handleClick={handleClick}
          handleClose={handleClose}
          theme={theme}
          options={options}
        />
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
          <p className="mi-body-sm f-400 mi-reset grey-400">No of Units Sold</p>
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
          <p className="mi-body-sm f-400 mi-reset grey-400">Address</p>
          <i class="fa-solid fa-sort grey-400"></i>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function BestsellerTable() {
  const [bestseller, setBestseller] = useState([]);
  const [bestsellerFilters, setBestsellerFilters] = useState();
  const [reportWarehouse, setReportWarehouse] = useState("");

  const { t } = useTranslation();

  const getBestsellers = async () => {
    const bestSellers = await getBestSellers(reportWarehouse);
    if (bestSellers) setBestseller(bestSellers.data.bestSellers);
  };

  useEffect(() => {
    getBestsellers();
    // getexpiredStockFilters();
  }, []);

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableHeader />
        </TableHead>
        <TableBody>
          {bestseller.map((product, index) => (
            <BestsellerRow t={t} product={product} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
